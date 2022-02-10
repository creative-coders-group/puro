import { finished } from "stream/promises";
import path from "path";
import fs from "fs";

export default {
  Mutation: {
    fileUpload: async (_, args) => {
      const { createReadStream, filename, mimetype, encoding } =
        await args.file;

      const stream = createReadStream();
      const fileaddress = path.join(process.cwd(), "Uploads", filename);
      const out = fs.createWriteStream(fileaddress);
      stream.pipe(out);
      await finished(out);

      let token = "23l2";
      return { token };
    },
  },
};
