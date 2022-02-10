import model from "./model.js";
import jsonwebtoken from "jsonwebtoken";

export default {
  Query: {
    users: async (_, args, context) => {
      let verified = jsonwebtoken.verify(context.token, process.env.SECRET_KEY);
      if (verified.role == "user") throw new Error("User cannot see this Data");
      return await model.users(args);
    },
  },
};
