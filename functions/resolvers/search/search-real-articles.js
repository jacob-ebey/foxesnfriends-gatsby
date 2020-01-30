const { ApolloError, gql } = require('apollo-server');
const NewsAPI = require('newsapi-netlify-lambda');

const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

exports.typeDefs = gql`
  type RealArticleSearchResultSource {
    name: String!
  }

  type RealArticleSearchResult {
    source: RealArticleSearchResultSource!
    url: String!
    urlToImage: String
    title: String!
    description: String
    author: String
    publishedAt: String!
  }

  type SearchRealArticlesEdge {
    node: RealArticleSearchResult!
  }

  type SearchRealArticlesPageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
  }

  type SearchRealArticlesConnection {
    pageInfo: SearchRealArticlesPageInfo!
    totalCount: Int!
    edges: [SearchRealArticlesEdge!]!
  }

  extend type Query {
    searchRealArticles(query: String!): SearchRealArticlesConnection!
  }
`;

exports.resolvers = {
  Query: {
    searchRealArticles: async (_, { query }) => {
      const response = await newsapi.v2.topHeadlines({
        q: query,
      });

      if (response.status !== 'ok') {
        throw new ApolloError('an error occured searching real articles', 'NEWS_API', response);
      }

      const pageInfo = {
        hasNextPage: false,
        hasPreviousPage: false,
      };

      const edges = response.articles.map((article) => ({
        node: article,
      }));

      return {
        edges,
        pageInfo,
        totalCount: response.articles.length,
      };
    },
  },
};
