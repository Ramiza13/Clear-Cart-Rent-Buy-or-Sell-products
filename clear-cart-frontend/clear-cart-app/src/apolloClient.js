import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const cache = new InMemoryCache();

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:8089/graphql',
  }),
  cache,
});

export default client;