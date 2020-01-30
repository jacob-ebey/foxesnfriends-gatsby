const path = require('path');

const { ApolloError, gql } = require('apollo-server');
const { default: fetch } = require('node-fetch');

// TODO: Create this from env variables
const API_ENDPOINT = 'https://api.github.com/search/code?q=in:file+language:Markdown+repo:jacob-ebey/foxesnfriends-gatsby+<QUERY>';

exports.typeDefs = gql`
  type ArticleSearchResult {
    path: String!
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

      const edges = items.map((item) => {
        const extension = path.extname(item.path);
        const resultPath = `/article/${path.basename(item.path, extension)}`;

        return {
          node: {
            path: resultPath,
          },
        };
      });

      return {
        edges,
        pageInfo,
        totalCount: edges.length,
      };
    },
  },
};
