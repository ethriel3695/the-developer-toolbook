import ApolloClient from 'apollo-boost';
import fetch from 'isomorphic-fetch';

export const client = new ApolloClient({
  uri: 'http://162.255.76.3:4000/graphql',
  //  uri: 'https://the-developer-toolbook-api.appspot.com/graphql',
  fetch,
});
