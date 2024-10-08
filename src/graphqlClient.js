import { GraphQLClient } from "graphql-request";

const url = 'https://landsdown.eu-central-a.ibm.stepzen.net/api/oily-goat/graphql';

const apiKey = process.env.EXPO_PUBLIC_GRAPHQL_API_KEY;

const client = new GraphQLClient(url, {
  headers: {
    Authorization: `apikey ${apiKey}`
  }
});

export default client;