// src/apolloClient.js
import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import {setContext} from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql/', // Replace with your backend URL
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      Authorization: token ? `JWT ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
