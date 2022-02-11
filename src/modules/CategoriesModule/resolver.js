import model from "./model.js";
import jsonwebtoken from "jsonwebtoken";

export default {
  Mutation: {
    addCategory: async (_, args, context) => {
      try {
        let verified = jsonwebtoken.verify(
          context.token,
          process.env.SECRET_KEY
        );
        if (verified.role == "user")
          throw new Error("User cannot see this Data");
        return await model.addCategory(args);
      } catch (error) {
        return { category_id: 0 };
      }
    },
    editCategory: async (_, args, context) => {
      try {
        let verified = jsonwebtoken.verify(
          context.token,
          process.env.SECRET_KEY
        );
        if (verified.role == "user")
          throw new Error("User cannot see this Data");
        return await model.editCategory(args);
      } catch (error) {
        return { category_id: 0 };
      }
    },
    removeCategory: async (_, args, context) => {
      try {
        let verified = jsonwebtoken.verify(
          context.token,
          process.env.SECRET_KEY
        );
        if (verified.role == "user")
          throw new Error("User cannot see this Data");
        return await model.removeCategory(args);
      } catch (error) {
        return { category_id: 0 };
      }
    },
  },
  Query: {
    categories: async () => {
      try {
        return await model.categories();
      } catch (error) {
        return { category_id: 0 };
      }
    },
  },
};
