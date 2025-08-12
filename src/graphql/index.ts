import express from "express"; // Importing the express framework for building the server
import { ApolloServer } from "@apollo/server"; // Importing ApolloServer for GraphQL server functionality
import { expressMiddleware } from "@apollo/server/express4"; // Importing expressMiddleware to integrate Apollo with Express
import dotenv from "dotenv";
import typeDefs from "./typeDefs/index.ts";
import resolvers from "./resolvers/index.ts";
import { supabaseAdmin } from "../supabase/config.ts";
import { Redis } from "ioredis";

dotenv.config();

const PORT = process.env.PORT || 3002; // Setting the port from environment variable or defaulting to 3002

const redis = new Redis({
  host: process.env.REDIS_HOST!,
  port: Number(process.env.REDIS_PORT || 6379),
  username: process.env.REDIS_USERNAME!,
  password: process.env.REDIS_PASSWORD!,
  maxRetriesPerRequest: null,
});

// Function to start the server
const startServer = async () => {
  const app = express(); // create an instance of an express application

  // middleware to parse JSON request bodies
  app.use(express.json());

  // creates a new Apollo Server instance with type definitions and resolvers
  const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
  });

  try {
    await server.start(); // start the Apollo Server

    // set up the GraphQL endpoint with middleware for apollo-client
    app.use(
      "/graphql",
      expressMiddleware(server, {
        context: async ({ req, res }) => {
          return { req, res };
        },
      })
    );

    // redirect handler for url shortener
    // whenever the URL is hit with /{key} -> this block catches that
    app.get("/:id", async (req, res) => {
      const id = req.params.id;

      // printing timestamp to test latency
      console.log(Date.now(), "-------Checking Redis-------");

      // get the long url from cache (it could return undefined/null if nothing exists)
      let longUrl = await redis.get(`url:${id}`);

      console.log({ longUrl }, "-------Checking Redis-------");

      // if we don't find cached URL from redis
      // then fetch from DB on the basis of the key
      if (!longUrl) {
        const { data, error } = await supabaseAdmin
          .from("urls")
          .select("long_url, expiry_at")
          .eq("id", req.params.id)
          .single();

        if (error || !data) {
          return res.status(404).send("Not found");
        }

        if (new Date(data.expiry_at).getTime() > Date.now()) {
          longUrl = data.long_url;

          // before leaving set the generated short key in redis for future use & reducing the latency then
          await redis.set(`url:${id}`, longUrl, "EX", 86400);
        } else {
          // expired
          // if its expired, then show it to the client
          res.status(410).json({ error: "Link expired" });
        }
      }

      // printing timestamp to test latency
      console.log(Date.now(), "-------Checking Redis-------");

      // redirect to the ling url with low latency because of redis
      res.redirect(301, longUrl);
    });

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}/graphql`); // Logging the server URL
    });
  } catch (error) {
    console.error("Server startup error:", error); // Logging any errors that occur during server startup
  }
};

// Invoking the function to start the server
startServer();
