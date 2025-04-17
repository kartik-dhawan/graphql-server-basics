import mutationDefs from "./mutation.type.ts";
import ordersDefs from "./orders.type.ts";
import postcardDefs from "./postcards.type.ts";
import queryDefs from "./queries.type.ts";

const typeDefs = [mutationDefs, queryDefs, postcardDefs, ordersDefs];

export default typeDefs;
