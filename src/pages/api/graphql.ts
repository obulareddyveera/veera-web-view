import { ApolloServer, gql } from "apollo-server-micro";
import { supabase } from "../../lib/supabaseClient";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

// Define the GraphQL schema
const typeDefs = gql`
  type Query {
    users: [User!]!
  }

  type User {
    id: ID!
    email: String
  }
`;

// Define the resolvers
const resolvers = {
  Query: {
    users: async () => {
      const { data, error } = await supabase.from("users").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  },
};

// Create an Apollo Server instance
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

// Export the API handler
let apolloServerHandler: NextApiHandler;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Start the server if it hasn't been started yet
  if (!apolloServerHandler) {
    await apolloServer.start();
    apolloServerHandler = apolloServer.createHandler({ path: "/api/graphql" });
  }

  return apolloServerHandler(req, res);
}
