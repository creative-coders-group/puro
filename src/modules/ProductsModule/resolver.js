import jsonwebtoken from "jsonwebtoken";
import model from "./model.js";
import { finished } from "stream/promises";
import path from "path";
import fs from "fs";

export default {
  Mutation: {
    addProduct: async (_, args, context) => {
      let verified = jsonwebtoken.verify(context.token, process.env.SECRET_KEY);
      if (verified.role == "user") throw new Error("User cannot see this Data");
      const { createReadStream, filename, mimetype, encoding } =
        await args.file;

      const stream = createReadStream();
      const fileaddress = path.join(process.cwd(), "Uploads", filename);
      const out = fs.createWriteStream(fileaddress);
      stream.pipe(out);
      await finished(out);
      args.picture_name = filename;
      return await model.addProduct(args);
    },
    editProduct: async (_, args, context) => {
      let verified = jsonwebtoken.verify(context.token, process.env.SECRET_KEY);
      if (verified.role == "user") throw new Error("User cannot see this Data");
      const { createReadStream, filename, mimetype, encoding } =
        await args.file;

      const stream = createReadStream();
      const fileaddress = path.join(process.cwd(), "Uploads", filename);
      const out = fs.createWriteStream(fileaddress);
      stream.pipe(out);
      await finished(out);
      args.picture_name = filename;
      return await model.editProduct(args);
    },
    removeProduct: async (_, args, context) => {
      let verified = jsonwebtoken.verify(context.token, process.env.SECRET_KEY);
      if (verified.role == "user") throw new Error("User cannot see this Data");
      return await model.removeProduct(args);
    },
  },
  Query: {
    products: async () => {
      return await model.products();
    },
  },
};
