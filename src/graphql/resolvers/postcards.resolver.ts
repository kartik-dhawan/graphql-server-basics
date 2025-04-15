import { GraphQLError } from "graphql";
import { Resolvers } from "../../generated/graphql.ts";
import { fetchPostcards, fetchPostcardsByIds } from "../actions/postcards.ts";

export const postcardQueries: Resolvers["Query"] = {
  getAllPostcards: async () => {
    try {
      const postcards = await fetchPostcards();

      return postcards;
    } catch (error) {
      throw new GraphQLError(
        error instanceof Error ? error.message : String(error)
      );
    }
  },

  getPostcardByID: async (_, { id }) => {
    try {
      const postcard = await fetchPostcardsByIds([id]);
      return postcard;
    } catch (error) {
      throw new GraphQLError(
        error instanceof Error ? error.message : String(error)
      );
    }
  },
};

export const postcardMutations: Resolvers["Query"] = {};
