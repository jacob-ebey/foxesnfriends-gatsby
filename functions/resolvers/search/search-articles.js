const path = require('path');

const { ApolloError, gql } = require('apollo-server');
const fm = require('front-matter');
const { default: fetch } = require('node-fetch');

// TODO: Create this from env variables
const API_ENDPOINT = 'https://api.github.com/search/code?q=in:file+language:Markdown+repo:jacob-ebey/foxesnfriends-gatsby+<QUERY>';
const RAW_URL = 'https://raw.githubusercontent.com/jacob-ebey/foxesnfriends-gatsby/master/';

exports.typeDefs = gql`
  type ArticleSearchResult {
    slug: String!
    title: String!
    overview: String!
    date: String!
    tags: [String!]!
    featuredimage: String!
  }

  type SearchArticlesEdge {
    node: ArticleSearchResult!
  }

  type SearchArticlesPageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
  }

  type SearchArticlesConnection {
    pageInfo: SearchArticlesPageInfo!
    totalCount: Int!
    edges: [SearchArticlesEdge!]!
  }

  extend type Query {
    searchArticles(query: String!): SearchArticlesConnection!
  }
`;

exports.resolvers = {
  Query: {
    searchArticles: async (_, { query }) => {
      const endpoint = API_ENDPOINT.replace('<QUERY>', query);

      const response = await fetch(endpoint, {
        headers: {
          Accept: 'application/json',
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      });

      if (response.status !== 200) {
        let extensions;
        try {
          extensions = response.json();
        } catch (err) {
          // TODO: Log error because we're not handling the response correctly if we get here.
          extensions = undefined;
        }
        throw new ApolloError('an error occured searching for articles in the underlying system', 'GITHUB_SEARCH', extensions);
      }

      const {
        items,
      } = await response.json();

      const pageInfo = {
        hasNextPage: false,
        hasPreviousPage: false,
      };

      const [edges, frontmatterPromises] = items.reduce((p, item) => {
        const extension = path.extname(item.path);
        const resultPath = `/article/${path.basename(item.path, extension)}`;

        return [
          [
            ...p[0],
            {
              node: {
                slug: resultPath,
              },
            },
          ],
          [
            ...p[1],
            fetch(RAW_URL + item.path, {
              headers: {
                Accept: 'application/json',
                Authorization: `token ${process.env.GITHUB_TOKEN}`,
              },
            }).then((rawResponse) => {
              if (rawResponse.status !== 200) {
                let extensions;
                try {
                  extensions = rawResponse.json();
                } catch (err) {
                  // TODO: Log error because we're not handling the response correctly if we
                  // get here.
                  extensions = undefined;
                }
                return Promise.reject(new ApolloError('an error occured searching for articles in the underlying system', 'GITHUB_SEARCH', extensions));
              }

              return rawResponse.text().then((raw) => fm(raw));
            }),
          ],
        ];
      }, [[], []]);

      const frontmatterResults = await Promise.all(frontmatterPromises);

      return {
        edges: edges.map((edge, index) => ({
          ...edge,
          node: {
            ...edge.node,
            ...frontmatterResults[index].attributes,
            date: frontmatterResults[index].attributes.date.toISOString(),
          },
        })),
        pageInfo,
        totalCount: edges.length,
      };
    },
  },
};
