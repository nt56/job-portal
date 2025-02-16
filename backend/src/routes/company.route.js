import express from "express";
import {
  registerCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
} from "../controllers/company.controller.js";
import userAuth from "../middlewares/userAuth.js";

const companyRoutes = express.Router();

companyRoutes.route("/register").post(userAuth, registerCompany);
companyRoutes.route("/get").get(userAuth, getCompanies);
companyRoutes.route("/get/:companyId").get(userAuth, getCompanyById);
companyRoutes.route("/update/:companyId").patch(userAuth, updateCompany);

export default companyRoutes;
