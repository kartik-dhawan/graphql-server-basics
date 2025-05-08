import { GraphQLError } from "graphql";
import { Resolvers } from "../../generated/graphql.ts";
import { fetchPostcardsByIds } from "../actions/postcards.ts";
import {
  addANewOrder,
  deleteOrderById,
  editAnOrder,
  fetchOrders,
  fetchSingleOrderById,
} from "../actions/orders.ts";

export const orderQueries: Resolvers["Query"] = {
  getAllOrders: async (_, __) => {
    try {
      const orders = await fetchOrders();
      return orders;
    } catch (error) {
      throw new GraphQLError(
        error instanceof Error ? error.message : String(error)
      );
    }
  },
  getOrderById: async (_, { id: orderSearchId }) => {
    try {
      const order = await fetchSingleOrderById(orderSearchId);
      return order;
    } catch (error) {
      throw new GraphQLError(
        error instanceof Error ? error.message : String(error)
      );
    }
  },
};

export const orderResolver: Resolvers = {
  Order: {
    postcards: async (parent) => {
      const { postcards } = parent;
      const ids = postcards.map((item) => item.uuid);

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

export const orderMutations: Resolvers["Mutation"] = {
  createNewOrder: async (_, { newOrderPayload }) => {
    try {
      const res = await addANewOrder(newOrderPayload);

      return {
        data: [res],
        message: "Order placed/added successfully",
        success: true,
      };
    } catch (error) {
      throw new GraphQLError(
        error instanceof Error ? error.message : String(error)
      );
    }
  },

  deleteOrder: async (_, { id }) => {
    if (!id) {
      throw new GraphQLError("Order ID is required");
    }

    try {
      await deleteOrderById(id);
    } catch (error) {
      throw new GraphQLError(
        error instanceof Error ? error.message : String(error)
      );
    }

    return {
      success: true,
      message: "Order deleted successfully",
    };
  },

  editAnOrder: async (_, { editOrderPayload }) => {
    const { orderId, orderStatus, paymentStatus } = editOrderPayload;

    if (!orderId) {
      throw new GraphQLError("Order ID is required");
    }

    try {
      const orderRec = await fetchSingleOrderById(orderId);
      if (!orderRec[0]) {
        throw new GraphQLError("No order found with this ID");
      }

      await editAnOrder(editOrderPayload);
      return {
        data: [
          {
            ...orderRec[0],
            orderStatus,
            paymentStatus,
          },
        ],
        success: true,
        message: "Order updated successfully",
      };
    } catch (error) {
      throw new GraphQLError(
        error instanceof Error ? error.message : String(error)
      );
    }
  },
};
