import cookieParser from "cookie-parser";
import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./utils/db.js";
import userRoutes from "./routes/user.route.js";
import companyRoutes from "./routes/company.route.js";
import jobRoutes from "./routes/job.route.js";
import applicationRoutes from "./routes/application.route.js";

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//API's
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", applicationRoutes);

// Database Connection & Server Start
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
