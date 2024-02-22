import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: "dhrifembt",
  api_key: "148746888835873",
  api_secret: "AkACIRLBdm-9sz6_Mqq_3JmlJkc",
});

const memoryStorage = multer.memoryStorage();
const upload = multer({ storage: memoryStorage });

const Schema = mongoose.Schema;
const PostSchema = new Schema({
    content: String,
    isPublic
});

const server = express();

// const memoryStorage = multer.memoryStorage();

server.use(express.json());
server.use(morgan("combined")); // Logger

server.use("/users", userController);
server.use("/posts", postController);

server.use("/index", (req, res) => res.status(200).send("Hello mindx!"));

server.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    // const buffer = file.buffer?.data;

    const dataUrl = `data:${file.mimetype};base64,${file.buffer.toString(
      "base64"
    )}`;
    const fileName = file.originalname.split(".")[0];

    const result = await cloudinary.uploader.upload(dataUrl, {
      public_id: fileName,
    });

    res.status(201).send();
  } catch (error) {
    res.status(500).send("error");
  }
});

mongoose
  .connect(process.env.MONGODB)
  .then(() =>
    server.listen(process.env.PORT, () => console.log("Server is running!"))
  );

// https://mongoosejs.com/docs/populate.html
// CRUD - https://mongoosejs.com/docs/models.html
