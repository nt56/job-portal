import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    //take feilds from req.body and check
    const { fullName, email, password, phoneNumber, role } = req.body;
    if (!fullName || !email || !password || !phoneNumber || !role) {
      return res.status(400).json({
        message: "Feilds should not be Empty..!",
        success: false,
      });
    }

    //check email already exist in DB
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already Exist With this email..!",
        success: false,
      });
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create new user
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
    });

    //send the response
    res.status(200).json({
      message: "User Registration Successful..!",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    //take feilds from req.body and check
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Feilds should not be Empty..!",
        success: fasle,
      });
    }

    //check user exist with email or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User does not Exist Register User..!",
        success: false,
      });
    }

    //compare and check password using bcrypt
    const ishashedPassword = await bcrypt.compare(password, user.password);
    if (!ishashedPassword) {
      return res.status(400).json({
        message: "Incorret User Credintials..!",
        success: false,
      });
    }

    //check role is correct or not
    if (role !== user.role) {
      return res.status(400).json({
        message: "Incorret User Role. User not exist with this role..!",
        success: false,
      });
    }

    //create token and send
    const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    //send the user login success and token
    res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Login Successful ${user.fullName}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    //set token null
    res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logout Successful..!",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    //get userID form token/cookie and store user
    const userId = req.id;
    const user = await User.findById(userId);

    //get file form req.file
    const file = req.file;

    // cloudinary comes later

    //get updated feilds from req.body
    const { fullName, phoneNumber, bio, skills } = req.body;

    // update values
    if (fullName) user.fullName = fullName;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skills;

    // resume comes later here...

    //save the user
    await user.save();

    //send the response
    res.status(200).json({
      message: `${user.fullName} Your Profile Updated successfuly..!`,
      data: user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
