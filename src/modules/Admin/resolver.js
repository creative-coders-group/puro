import model from "./model.js";
import jsonwebtoken from "jsonwebtoken";

export default {
  Query: {
    totalPaidMoney: async (_, __, context) => {
      try {
        let verified = jsonwebtoken.verify(
          context.token,
          process.env.SECRET_KEY
        );
        if (verified.role == "user")
          throw new Error("User cannot see this Data");
        return await model.totalPaidMoney();
      } catch (error) {
        return 0;
      }
    },
    totalUnPaidMoney: async (_, __, context) => {
      try {
        let verified = jsonwebtoken.verify(
          context.token,
          process.env.SECRET_KEY
        );
        if (verified.role == "user")
          throw new Error("User cannot see this Data");
        return await model.totalUnPaidMoney();
      } catch (error) {
        return 0;
      }
    },
    mostSoldProduct: async (_, __, context) => {
      try {
        let verified = jsonwebtoken.verify(
          context.token,
          process.env.SECRET_KEY
        );
        if (verified.role == "user")
          throw new Error("User cannot see this Data");
        return await model.mostSoldProduct();
      } catch (error) {
        return {
          prouct_id: 0,
        };
      }
    },
    leastSoldProduct: async (_, __, context) => {
      try {
        let verified = jsonwebtoken.verify(
          context.token,
          process.env.SECRET_KEY
        );
        if (verified.role == "user")
          throw new Error("User cannot see this Data");
        return await model.leastSoldProduct();
      } catch (error) {
        return {
          prouct_id: 0,
        };
      }
    },
  },
};
