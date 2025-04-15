import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    getAllPostcards: [Postcard!]
    getPostcardByID(id: ID!): [Postcard!]
    getAllOrders: [Order!]
  }

  enum ProductCategory {
    postcards
  }

  type FrameSize {
    x: Int
    y: Int
  }

  type Postcard {
    productId: ID!
    createdAt: String
    category: ProductCategory!
    description: String
    name: String
    price: Int
    size: FrameSize
    stock: Int
    uuid: ID!
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
