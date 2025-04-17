import { gql } from "graphql-tag";

const ordersDefs = gql`
  extend type Query {
    getAllOrders: [Order!]
  }

  type OrderedPostcards {
    buyingQuantity: Int
    uuid: ID!
  }

  type Order {
    orderID: ID!
    orderedAt: String
    orderStatus: String
    paymentStatus: Boolean
    totalAmount: Int
    orderedPostcardsUUID: [OrderedPostcards!]!
    postcards: [Postcard!]
  }
`;

export default ordersDefs;
