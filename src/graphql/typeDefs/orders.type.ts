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

  enum OrderStatus {
    PENDING_APPROVAL
    SHIPPED
    IN_TRANSIT
    DELIVERED
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
    orderStatus: OrderStatus
    paymentStatus: Boolean
    totalAmount: Int
    postcards: [Postcard!]
  }

  type DeleteOrderResponse {
    message: String
    success: Boolean!
  }
`;

export default ordersDefs;
