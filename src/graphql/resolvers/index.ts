import { Resolvers } from "../../generated/graphql.ts";
import { orderMutations } from "./orders.resolver.ts";

export const resolvers: Resolvers = {
  Mutation: {
    ...orderMutations,
  },
};

export default resolvers;
