import express from "express";
import {
  register,
  login,
  logout,
  updateProfile,
} from "../controllers/user.controller.js";
import userAuth from "../middlewares/userAuth.js";

const userRoutes = express.Router();

userRoutes.route("/register").post(register);
userRoutes.route("/login").post(login);
userRoutes.route("/logout").post(logout);
userRoutes.route("/profile/update").patch(userAuth, updateProfile);

export default userRoutes;
