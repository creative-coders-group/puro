import model from "./model.js";
import jsonwebtoken from "jsonwebtoken";

export default {
  Mutation: {
    addCategory: async (_, args, context) => {
      let verified = jsonwebtoken.verify(context.token, process.env.SECRET_KEY);
      if (verified.role == "user") throw new Error("User cannot see this Data");
      return await model.addCategory(args);
    },
    editCategory: async (_, args, context) => {
      let verified = jsonwebtoken.verify(context.token, process.env.SECRET_KEY);
      if (verified.role == "user") throw new Error("User cannot see this Data");
      return await model.editCategory(args);
    },
    removeCategory: async (_, args, context) => {
      let verified = jsonwebtoken.verify(context.token, process.env.SECRET_KEY);
      if (verified.role == "user") throw new Error("User cannot see this Data");
      return await model.removeCategory(args);
    },
  },
  Query: {
    categories: async () => {
      return await model.categories();
    },
  },
};
