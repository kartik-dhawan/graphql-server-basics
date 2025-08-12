import { GraphQLError } from "graphql";
import { Resolvers } from "../../generated/graphql.ts";
import { supabaseAdmin } from "../../supabase/config.ts";
import { isValidHttpUrl } from "../actions/utils.ts";
import { nanoid } from "nanoid";

export const orderMutations: Resolvers["Mutation"] = {
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
