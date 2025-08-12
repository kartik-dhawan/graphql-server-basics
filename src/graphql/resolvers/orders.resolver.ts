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
import { nanoid } from "nanoid";
import { supabaseAdmin } from "../../supabase/config.ts";
import { isValidHttpUrl } from "../actions/utils.ts";

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

  shortenTheUrl: async (_, { url: longUrl }) => {
    const BASE_URL = process.env.BASE_URL || "http://localhost:3002/";

    if (!isValidHttpUrl(longUrl)) {
      throw new GraphQLError("Invalid URL", {
        extensions: { code: "BAD_USER_INPUT" },
      });
    }

    // Check if the URL already exists
    const { data: existing, error: selectError } = await supabaseAdmin
      .from("urls")
      .select("id")
      .eq("long_url", longUrl)
      .single();

    if (selectError && selectError.code !== "PGRST116") {
      // PGRST116 = no rows found
      throw new GraphQLError("Supabase select failed", {
        extensions: { code: "SUPABASE_ERROR", details: selectError.message },
      });
    }

    if (existing) {
      // Already exists - return the old short URL
      return `${BASE_URL}${existing.id}`;
    }

    // Generate a new short ID
    const id = nanoid(8);

    // Insert new record
    const { error: insertError } = await supabaseAdmin
      .from("urls")
      .insert({ id, long_url: longUrl, created_at: new Date().toISOString() });

    if (insertError) {
      throw new GraphQLError("Supabase insert failed", {
        extensions: { code: "SUPABASE_ERROR", details: insertError.message },
      });
    }

    return `${BASE_URL}${id}`;
  },
};
