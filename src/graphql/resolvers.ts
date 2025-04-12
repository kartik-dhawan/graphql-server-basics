import { Resolvers } from "../generated/graphql.ts";
import { orderQueries, orderResolver } from "./resolvers/orders.resolver.ts";
import { postcardQueries } from "./resolvers/postcards.resolver.ts";

export const resolvers: Resolvers = {
  Query: {
    ...postcardQueries,
    ...orderQueries,
  },
  ...orderResolver,
};

export default resolvers;
