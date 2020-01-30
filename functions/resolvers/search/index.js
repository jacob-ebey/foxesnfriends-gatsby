const { gql } = require('apollo-server');

const { resolvers: searchArticlesResolvers, typeDefs: searchArticlesTypeDefs } = require('./search-articles');

exports.typeDefs = gql`
  ${searchArticlesTypeDefs}
`;

exports.resolvers = {
  Query: {
    ...searchArticlesResolvers.Query,
  },
};
