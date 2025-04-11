import { GraphQLError } from "graphql";
import { Resolvers } from "../../generated/graphql.ts";
import { fetchPostcards } from "../actions/postcards.ts";

export const postcardQueries: Resolvers["Query"] = {
  getAllPostcards: async (_, __) => {
    try {
      const postcards = await fetchPostcards();

      return postcards;
    } catch (error) {
      console.log(error);
      throw new GraphQLError(
        error instanceof Error ? error.message : String(error)
      );
    }
  },

  getPostcardByID: () => {
    return [];
  },
};

export const postcardMutations: Resolvers["Query"] = {};
