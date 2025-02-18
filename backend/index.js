import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./src/utils/db.js";
import userRoutes from "./src/routes/user.route.js";
import companyRoutes from "./src/routes/company.route.js";
import jobRoutes from "./src/routes/job.route.js";
import applicationRoutes from "./src/routes/application.route.js";

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

//API's
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", applicationRoutes);

const PORT = process.env.PORT || 5000;
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
