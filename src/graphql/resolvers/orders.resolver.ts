import { GraphQLError } from "graphql";
import { Resolvers } from "../../generated/graphql.ts";
import { supabaseAdmin } from "../../supabase/config.ts";
import {
  BASE_URL,
  isValidHttpUrl,
  SUPABASE_ERROR_CODES,
} from "../actions/utils.ts";
import { nanoid } from "nanoid";

export const orderMutations: Resolvers["Mutation"] = {
  shortenTheUrl: async (_, { url: longUrl }) => {
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

    if (
      selectError &&
      selectError.code !== SUPABASE_ERROR_CODES.NO_ROWS_FOUND
    ) {
      // PGRST116 = no rows found (According to Supabase docs)
      throw new GraphQLError("Supabase select failed", {
        extensions: { code: "SUPABASE_ERROR", details: selectError.message },
      });
    }

    if (existing) {
      // if it already exists - return the old short URL
      return `${BASE_URL}${existing.id}`;
    }

    // else generate a new short ID
    const id = nanoid(8);

    // insert new record with new shortened & long url both
    // id -> short url
    // long_url -> old url
    // used short url as ID & primary key to catch duplicacy
    const { error: insertError } = await supabaseAdmin
      .from("urls")
      .insert({ id, long_url: longUrl, created_at: new Date().toISOString() });

    // here we can catch the duplicacy or primary key error to handle the case of the generated key not being unique
    // if we get that error, simply regenerate the key & try again
    if (insertError) {
      throw new GraphQLError("Supabase insert failed", {
        extensions: { code: "SUPABASE_ERROR", details: insertError.message },
      });
    }

    // return the URL as string
    return `${BASE_URL}${id}`;
  },
};
