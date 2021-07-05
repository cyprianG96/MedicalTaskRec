import {
  ApolloClient,
  InMemoryCache,
  gql,
  createHttpLink,
} from "@apollo/client";

const httpLink = createHttpLink({
  uri: "https://countries.trevorblades.com",
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export const LIST_COUNTRIES = gql`
  {
    countries {
      name
      emoji
      code
      continent {
        code
        name
      }
      languages {
        code
        name
      }
    }
  }
`;
