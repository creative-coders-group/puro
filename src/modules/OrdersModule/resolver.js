import model from "./model.js";
import jsonwebtoken from "jsonwebtoken";

export default {
  Query: {
    orders: async (_, args, context) => {
      let token = context.token;
      let user = token
        ? jsonwebtoken.verify(token, process.env.SECRET_KEY)
        : {};
      if (user.role == "admin") return model.orders(args);
      if (user.role == "user" && args.user_id) return model.orders(args);
    },
  },

  Mutation: {
    addOrder: async (_, args, context) => {
      let token = context.token;
      let user = token
        ? jsonwebtoken.verify(token, process.env.SECRET_KEY)
        : {};
      if (user.role == "admin") throw new Error("Admins cannot add order");
      return await model.addOrder(user.user_id, args);
    },
    removeOrder: async (_, args, context) => {
      let token = context.token;
      let user = token
        ? jsonwebtoken.verify(token, process.env.SECRET_KEY)
        : {};
      if (!user) throw new Error("Unauthorized user");
      if (user.role == "admin") throw new Error("Admins cannot remove order");
      return await model.removeOrder(args);
    },
    buyAllOrders: async (_, __, context) => {
      let token = context.token;
      let user = token
        ? jsonwebtoken.verify(token, process.env.SECRET_KEY)
        : {};
      if (!user) throw new Error("Unauthorized user");
      if (user.role == "admin") throw new Error("Admins cannot buy order");
      return await model.buyAllOrders(user.user_id);
    },
  },
};
