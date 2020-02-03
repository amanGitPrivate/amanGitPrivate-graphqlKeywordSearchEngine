// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import App from "./containers/KeywordTable";
import { tableConstants } from './constants/constants';

const client = new ApolloClient({
  uri: tableConstants.graphqlLink
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
