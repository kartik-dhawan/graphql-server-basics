import { gql } from "graphql-tag";

const postcardDefs = gql`
  type Query {
    getAllPostcards: [Postcard!]
    getPostcardByID(id: ID!): [Postcard!]
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

export default postcardDefs;
