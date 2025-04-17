import { gql } from "graphql-tag";

const postcardDefs = gql`
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
