import { makeExecutableSchema } from "@graphql-tools/schema";

import TypeModule from "./types/index.js";
import UserModule from "./UsersModule/index.js";
import fileModule from "./module3/index.js";
import CategoryModule from "./CategoriesModule/index.js";
import ProductModule from "./ProductsModule/index.js";
import AuthModule from "./Auth/index.js";
import OrdersModule from "./OrdersModule/index.js";
import AdminModule from "./Admin/index.js";

export default makeExecutableSchema({
  typeDefs: [
    TypeModule.typeDefs,
    UserModule.typeDefs,
    fileModule.typeDefs,
    CategoryModule.typeDefs,
    ProductModule.typeDefs,
    AuthModule.typeDefs,
    OrdersModule.typeDefs,
    AdminModule.typeDefs,
  ],
  resolvers: [
    AdminModule.resolvers,
    TypeModule.resolvers,
    UserModule.resolvers,
    fileModule.resolvers,
    CategoryModule.resolvers,
    ProductModule.resolvers,
    AuthModule.resolvers,
    OrdersModule.resolvers,
  ],
});

// import { gql } from 'apollo-server-express'
// import { readFileSync } from 'fs'
// import path from 'path'

// import resolvers from './resolvers.js'
// const typeDefs = readFileSync(path.join( process.cwd(), 'src', 'modules', 'schema.gql' ))

// export default {
// 	resolvers,
// 	typeDefs: gql`${typeDefs}`
// }
