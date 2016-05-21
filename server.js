import express from 'express';
import { apolloServer } from 'graphql-tools';
import Schema from './data/schema';
import Mocks from './data/mocks';
import Resolvers from './data/resolvers';
import { Tracer, addTracingToResolvers, makeExecutableSchema } from 'graphql-tools';
import uuid from 'node-uuid';

const GRAPHQL_PORT = 8080;

var graphQLServer = express();
const tracer = new Tracer({ TRACER_APP_KEY: 'EBF41910-AE88-43FA-886B-FE9D4446A13A' });
graphQLServer.use('/graphql', apolloServer({
    pretty: true,
    schema: Schema,
    resolvers: Resolvers,
    tracer,
    //mocks: Mocks,
  }));

graphQLServer.use(express.static('bundle'));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));
