import { gql } from "graphql-tag";

const mutationDefs = gql`
  type Mutation {
    shortenTheUrl(url: String!): String!
  }
`;

export default mutationDefs;
