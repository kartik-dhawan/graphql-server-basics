import { Resolvers } from "../generated/graphql.ts";
import { postcardQueries } from "./resolvers/postcards.resolver.ts";

export const resolvers: Resolvers = {
  Query: {
    ...postcardQueries,
  },
};

export default resolvers;
