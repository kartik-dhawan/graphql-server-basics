import { GraphQLError } from "graphql";
import { Resolvers } from "../../generated/graphql.ts";
import { fetchPostcardsByIds } from "../actions/postcards.ts";
import { fetchOrders } from "../actions/orders.ts";

export const orderQueries: Resolvers["Query"] = {
  getAllOrders: async (_, __) => {
    try {
      const orders = await fetchOrders();
      return orders;
    } catch (error) {
      console.log(error);
      throw new GraphQLError(
        error instanceof Error ? error.message : String(error)
      );
    }
  },
};

export const orderResolver: Resolvers = {
  Order: {
    postcards: async (parent) => {
      const { orderedPostcardsUUID } = parent;
      const ids = orderedPostcardsUUID.map((item) => item.uuid);

      try {
        const postcards = await fetchPostcardsByIds(ids);
        return postcards;
      } catch (error) {
        throw new GraphQLError(
          error instanceof Error ? error.message : String(error)
        );
      }
    },
  },
};
