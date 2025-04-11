import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    getOrders: ID!
    exampleQuery: String
    getAllPostcards: String
  }
`;
