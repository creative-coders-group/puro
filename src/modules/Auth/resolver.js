import model from "./model.js";
import jsonwebtoken from "jsonwebtoken";

export default {
  Mutation: {
    register: async (_, args) => {
      try {
        let reigstered_user = await model.register(args);
        let token = jsonwebtoken.sign(
          reigstered_user[0],
          process.env.SECRET_KEY,
          {
            expiresIn: 86400,
          }
        );
        return { token };
      } catch (error) {
        return { token: error };
      }
    },
    login: async (_, args) => {
      try {
        let logged_user = await model.login(args);
        let token = jsonwebtoken.sign(logged_user[0], process.env.SECRET_KEY, {
          expiresIn: 86400,
        });
        return { token };
      } catch (error) {
        return {
          token: error,
        };
      }
    },
  },
};
