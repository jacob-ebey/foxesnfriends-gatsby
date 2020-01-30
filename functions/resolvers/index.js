const { gql } = require('apollo-server');

const { resolvers: searchResolvers, typeDefs: searchTypeDefs } = require('./search');

const baseTypeDefs = gql`
  type Query {
    ping: String
  }
`;

const baseResolvers = {
  Query: {
    ping: () => 'pong',
  },
};

exports.resolvers = [baseResolvers, searchResolvers];

exports.typeDefs = [baseTypeDefs, searchTypeDefs];
