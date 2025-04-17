import { gql } from "graphql-tag";

const ordersDefs = gql`
  input OrderedPostcardsPayload {
    buyingQuantity: Int!
    uuid: ID!
  }

  input CreateNewOrderMutationVariables {
    paymentStatus: Boolean!
    totalAmount: Int!
    orderedPostcardsUUID: [OrderedPostcardsPayload!]!
  }

  type CreateNewOrderResponse {
    data: [Order!]
    message: String
    success: Boolean
  }

  type OrderedPostcards {
    buyingQuantity: Int!
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
