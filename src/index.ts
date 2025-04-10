import express from "express"; // Importing the express framework for building the server
import { ApolloServer } from "@apollo/server"; // Importing ApolloServer for GraphQL server functionality
import { expressMiddleware } from "@apollo/server/express4"; // Importing expressMiddleware to integrate Apollo with Express
import { readFileSync } from "fs";
import path, { dirname } from "path";
import { gql } from "graphql-tag";
import { fileURLToPath } from "url";
import { resolvers } from "./resolvers.ts";

const PORT = process.env.PORT || 3002; // Setting the port from environment variable or defaulting to 3002

/**
 * import.meta.url gives the current file path as a file:// URL.
 * fileURLToPath(import.meta.url) converts it to a real file path (/Users/...).
 * dirname() gives the directory path — exactly like __dirname.
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * We'll use both readFileSync and the path utility to read in the contents of the schema.graphql file.
 * The gql utility we're importing is a tagged template literal, used for wrapping GraphQL strings like
 * the schema definition we're about to import! This converts GraphQL strings into the format that Apollo
 * libraries expect when working with operations and schemas, and it also enables syntax highlighting.
 */
const typeDefs = gql(
  readFileSync(path.resolve(__dirname, "./schema.graphql"), {
    encoding: "utf-8",
  })
);

// Function to start the server
const startServer = async () => {
  const app = express(); // Creating an instance of an Express application

  // Middleware to parse JSON request bodies
  app.use(express.json());

  // Creating a new Apollo Server instance with type definitions and resolvers
  const server = new ApolloServer({
    typeDefs,
    resolvers,
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

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}/graphql`); // Logging the server URL
    });
  } catch (error) {
    console.error("Server startup error:", error); // Logging any errors that occur during server startup
  }
};

// Invoking the function to start the server
startServer();
