import express from "express";
import {
  getAllJobs,
  getJobById,
  getJobsByAdmin,
  postJob,
} from "../controllers/job.controller.js";
import userAuth from "../middlewares/userAuth.js";

const jobRoutes = express.Router();

jobRoutes.route("/create").post(userAuth, postJob);
jobRoutes.route("/get").get(userAuth, getAllJobs);
jobRoutes.route("/getadminjobs").get(userAuth, getJobsByAdmin);
jobRoutes.route("/get/:jobId").get(userAuth, getJobById);

export default jobRoutes;
