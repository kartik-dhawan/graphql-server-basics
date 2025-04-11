import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    getAllPostcards: [Postcard!]
    getPostcardByID: [Postcard!]
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
`;
