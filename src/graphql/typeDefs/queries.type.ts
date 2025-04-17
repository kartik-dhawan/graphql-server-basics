import { gql } from "graphql-tag";

const queryDefs = gql`
  type Query {
    getAllOrders: [Order!]
    getOrderById(id: ID!): [Order!]
    getAllPostcards: [Postcard!]
    getPostcardByID(id: ID!): [Postcard!]
  }
`;

export default queryDefs;
