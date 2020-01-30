const { gql } = require('apollo-server');

const {
  resolvers: searchArticlesResolvers,
  typeDefs: searchArticlesTypeDefs,
} = require('./search-articles');
const {
  resolvers: searchRealArticlesResolvers,
  typeDefs: searchRealArticlesTypeDefs,
} = require('./search-real-articles');

exports.typeDefs = gql`
  ${searchArticlesTypeDefs}
  ${searchRealArticlesTypeDefs}
`;

exports.resolvers = {
  Query: {
    ...searchArticlesResolvers.Query,
    ...searchRealArticlesResolvers.Query,
  },
};
