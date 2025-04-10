# GraphQL Server Setup

This README provides a step-by-step guide on how to set up a GraphQL server using Apollo Server and Express.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14.16.0 or higher): This is the JavaScript runtime that allows you to run JavaScript on the server side.
- [npm](https://www.npmjs.com/) (Node package manager): This is the package manager for Node.js, used to install libraries and dependencies.

## Installation

1. **Clone the repository**:
   This step creates a local copy of the project repository on your machine.
   ```bash
   git clone https://github.com/yourusername/graphql-server-basics.git
   cd graphql-server-basics
   ```

2. **Install dependencies**:
   This command installs all the required packages specified in the `package.json` file, which are necessary for the application to run.
   ```bash
   npm install
   ```

## Configuration

1. **Set up environment variables** (optional):
   You can set the `PORT` environment variable to specify the port on which the server will run. If not set, it defaults to `3002`. This allows you to customize the server's listening port without changing the code.

2. **Modify the server code**:
   The main server code is located in `src/index.ts`. You can modify the GraphQL schema and resolvers as needed. This is where you define your GraphQL API's structure and the logic for handling requests.

## Running the Server

To start the server, run the following command:

### Explanation of Key Components

- **app.use()**: This method is used to mount middleware functions at a specified path. In the context of an Express application, it allows you to define middleware that will be executed for every request that matches the specified path. For example, `app.use(express.json())` is used to parse incoming JSON request bodies, making it easier to work with the data sent by clients.

- **expressMiddleware**: This is a middleware function provided by Apollo Server to integrate GraphQL with Express. It allows you to define a GraphQL endpoint (e.g., `/graphql`) and handle incoming GraphQL requests. The `expressMiddleware` function takes the Apollo Server instance and an options object, which can include a `context` function. This function is executed for each request and can be used to pass additional data (like request and response objects) to your resolvers, enabling you to access them during query execution.

By understanding these components, you can effectively set up and customize your GraphQL server to meet your application's needs.
