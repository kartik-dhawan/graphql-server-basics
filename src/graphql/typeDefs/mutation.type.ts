import { gql } from "graphql-tag";

const mutationDefs = gql`
  type Mutation {
    createNewOrder(
      newOrderPayload: CreateNewOrderMutationVariables!
    ): CreateNewOrderResponse!
  }
`;

export default mutationDefs;
