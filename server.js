import express from 'express';
import { apolloServer } from 'graphql-tools';
import Schema from './data/schema';
import Mocks from './data/mocks';
import Resolvers from './data/resolvers';
import { Tracer, addTracingToResolvers, makeExecutableSchema } from 'graphql-tools';


const GRAPHQL_PORT = 8080;

const tracer = new Tracer('T1');

const jsSchema = makeExecutableSchema({ typeDefs: Schema, resolvers: Resolvers })
addTracingToResolvers(jsSchema, tracer);

var graphQLServer = express();
graphQLServer.use('/', apolloServer({
  graphiql: true,
  pretty: true,
  schema: jsSchema,
  logFn: tracer.log.bind(tracer),
  //mocks: Mocks,
}));
graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));
