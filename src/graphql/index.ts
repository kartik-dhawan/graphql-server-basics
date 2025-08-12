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
  const app = express(); // Creating an instance of an Express application

  // Middleware to parse JSON request bodies
  app.use(express.json());

  // Creating a new Apollo Server instance with type definitions and resolvers
  const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
  });

  try {
    await server.start(); // Starting the Apollo Server

    // Setting up the GraphQL endpoint with middleware
    app.use(
      "/graphql",
      expressMiddleware(server, {
        context: async ({ req, res }) => {
          return { req, res }; // Returning the request and response objects in the context
        },
      })
    );

    // Redirect handler for url shortener
    app.get("/:id", async (req, res) => {
      const id = req.params.id;

      console.log(Date.now(), "-------Checking Redis-------");

      let longUrl = await redis.get(`url:${id}`);

      console.log({ longUrl }, "-------Checking Redis-------");

      if (!longUrl) {
        const { data, error } = await supabaseAdmin
          .from("urls")
          .select("long_url")
          .eq("id", req.params.id)
          .single();

        if (error || !data) {
          return res.status(404).send("Not found");
        }

        longUrl = data.long_url;

        await redis.set(`url:${id}`, longUrl, "EX", 86400);
      }

      console.log(Date.now(), "-------Checking Redis-------");
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
