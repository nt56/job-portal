import express from "express";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} from "../controllers/application.controller.js";
import userAuth from "../middlewares/userAuth.js";

const applicationRoutes = express.Router();

applicationRoutes.route("/jobApply/:jobId").post(userAuth, applyJob);
applicationRoutes.route("/getAppliedJobs").get(userAuth, getAppliedJobs);
applicationRoutes.route("/:jobId/applicants").get(userAuth, getApplicants);
applicationRoutes
  .route("/status/:applicationId/update")
  .patch(userAuth, updateStatus);

export default applicationRoutes;
