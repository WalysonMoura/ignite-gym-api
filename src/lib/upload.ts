import multer from "multer";
import crypto from "crypto";
import path from "path";

 const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");
export const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads");

export const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(request:any, file:any, callback:any) {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};

