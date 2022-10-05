import { createServer } from "@graphql-yoga/node";
import {typeDefs} from './typeDefs.js';
import { resolvers } from "./resolvers.js";

const server = createServer({
  schema: {typeDefs, resolvers}
})

export default server;