import model from "./model.js";
import jsonwebtoken from "jsonwebtoken";

export default {
  Query: {
    totalPaidMoney: async (_, __, context) => {
      let verified = jsonwebtoken.verify(context.token, process.env.SECRET_KEY);
      if (verified.role == "user") throw new Error("User cannot see this Data");
      return await model.totalPaidMoney();
    },
    totalUnPaidMoney: async (_, __, context) => {
      let verified = jsonwebtoken.verify(context.token, process.env.SECRET_KEY);
      if (verified.role == "user") throw new Error("User cannot see this Data");
      return await model.totalUnPaidMoney();
    },
    mostSoldProduct: async (_, __, context) => {
      let verified = jsonwebtoken.verify(context.token, process.env.SECRET_KEY);
      if (verified.role == "user") throw new Error("User cannot see this Data");
      return await model.mostSoldProduct();
    },
    leastSoldProduct: async (_, __, context) => {
      let verified = jsonwebtoken.verify(context.token, process.env.SECRET_KEY);
      if (verified.role == "user") throw new Error("User cannot see this Data");
      return await model.leastSoldProduct();
    },
  },
};
