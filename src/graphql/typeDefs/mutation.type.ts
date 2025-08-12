import { gql } from "graphql-tag";

const mutationDefs = gql`
  type Mutation {
    createNewOrder(
      newOrderPayload: CreateNewOrderMutationVariables!
    ): CreateNewOrderResponse!

    editAnOrder(editOrderPayload: EditOrderPayload!): CreateNewOrderResponse

    deleteOrder(id: ID!): DeleteOrderResponse!

    shortenTheUrl(url: String!): String!
  }
`;

export default mutationDefs;
