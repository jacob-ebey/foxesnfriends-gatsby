const { ApolloServer } = require('apollo-server-lambda');

const { resolvers, typeDefs } = require('./resolvers');

const {
  NODE_ENV,
  CONTEXT: NETLIFY_ENV = NODE_ENV,
} = process.env;
const isNetlifyProduction = NETLIFY_ENV === 'production';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: !isNetlifyProduction,
  tracing: !isNetlifyProduction,
});

exports.handler = server.createHandler();
