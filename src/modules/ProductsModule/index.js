import { gql } from "apollo-server-express";
import { readFileSync } from "fs";
import path from "path";

import resolvers from "./resolver.js";
const typeDefs = readFileSync(
  path.join(process.cwd(), "src", "modules", "ProductsModule", "schema.gql"),
  "utf-8"
);

export default {
  resolvers,
  typeDefs: gql`
    ${typeDefs}
  `,
};
