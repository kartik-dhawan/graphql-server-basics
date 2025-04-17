import { Resolvers } from "../../generated/graphql.ts";
import {
  orderMutations,
  orderQueries,
  orderResolver,
} from "./orders.resolver.ts";
import { postcardQueries } from "./postcards.resolver.ts";

export const resolvers: Resolvers = {
  Query: {
    ...postcardQueries,
    ...orderQueries,
  },
  Mutation: {
    ...orderMutations,
  },
  ...orderResolver,
};

export default resolvers;
