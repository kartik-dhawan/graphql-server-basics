import { gql } from "graphql-tag";

const queryDefs = gql`
  type Query {
    getAllOrders: String
  }
`;

export default queryDefs;
