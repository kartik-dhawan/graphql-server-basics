import express from "express"; // Importing the express framework for building the server
import { ApolloServer } from "@apollo/server"; // Importing ApolloServer for GraphQL server functionality
import { expressMiddleware } from "@apollo/server/express4"; // Importing expressMiddleware to integrate Apollo with Express

const PORT = process.env.PORT || 3002; // Setting the port from environment variable or defaulting to 3002

// Function to start the server
const startServer = async () => {
  const app = express(); // Creating an instance of an Express application

  // Middleware to parse JSON request bodies
  app.use(express.json());

  // Creating a new Apollo Server instance with type definitions and resolvers
  const server = new ApolloServer({
    typeDefs: `
            type Query {
                getOrders: String
            }
        `,
    resolvers: {
      Query: {}, // Placeholder for resolvers
    },
  });

  try {
    await server.start(); // Starting the Apollo Server

    // Setting up the GraphQL endpoint with middleware
    app.use(
      "/graphql",
      expressMiddleware(server, {
        context: async ({ req, res }) => {
          console.log("Context - req.body:", req.body); // Logging the request body for debugging
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
