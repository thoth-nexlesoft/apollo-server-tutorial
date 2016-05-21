import React from 'react';
import ReactDOM from 'react-dom';
import GraphiQL from 'apollo-tripod';
import fetch from 'isomorphic-fetch';
require('!style!css!../node_modules/apollo-tripod/graphiql.css');
function graphQLFetcher(graphQLParams) {
  return fetch(window.location.origin + '/graphql', {
    method: 'post',
    headers: { 'Content-Type': 'application/json', 'X-Apollo-Tracer-Extension': 'on' },
    body: JSON.stringify(graphQLParams),
  }).then(response => response.json());
}

ReactDOM.render(<GraphiQL fetcher={graphQLFetcher} />, document.getElementById('app'));
