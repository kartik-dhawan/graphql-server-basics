import { Resolvers } from "../../generated/graphql.ts";
import { orderQueries, orderResolver } from "./orders.resolver.ts";
import { postcardQueries } from "./postcards.resolver.ts";

export const resolvers: Resolvers = {
  Query: {
    ...postcardQueries,
    ...orderQueries,
  },
  ...orderResolver,
};

export default resolvers;
