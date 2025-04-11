import { Resolvers } from "../generated/graphql.ts";

export const resolvers: Resolvers = {
  Query: {
    getOrders: () => {
      return "ID-27863782-gdkdbbnbn";
    },
    exampleQuery: () => "This is an example RESPONSE",
  },
};

export default resolvers;
