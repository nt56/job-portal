import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({});
import connectDB from "./src/utils/db.js";

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    console.log("Database Connection Successfull....!");
    app.listen(PORT, () => {
      console.log(`Server is successfully listening on port ${PORT}...!`);
    });
  })
  .catch((err) => {
    console.log("Database Connection UnSuccessfull....!" + err.message);
  });
