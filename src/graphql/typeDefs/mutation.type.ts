import { gql } from "graphql-tag";

const mutationDefs = gql`
  type Mutation {
    createNewOrder(
      newOrderPayload: CreateNewOrderMutationVariables!
    ): CreateNewOrderResponse!

    deleteOrder(id: ID!): DeleteOrderResponse!
  }
`;

export default mutationDefs;
