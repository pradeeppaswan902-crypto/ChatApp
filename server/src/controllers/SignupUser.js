import User from "../models/chatappModel.js";
import bcrypt from "bcrypt";
import { genToken } from "../utils/genToken.js";  // ✅ Import karna

export const UserRegister = async (req, res, next) => {
  try {
    const { fullName, email, phone, password } = req.body;

    if (!fullName || !email || !phone || !password) {
      const error = new Error("All fields required");
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      const error = new Error("Email already registered");
      error.statusCode = 409;
      return next(error);
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      email: email.toLowerCase(),
      phone,
      password: hashPassword,
    });

    // ✅ Token generate using genToken from utils
    const token = genToken(newUser);

    res.status(201).json({
      message: "Registration Successful",
      data: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        phone: newUser.phone,
        token, // send token to frontend
      },
    });
  } catch (error) {
    next(error);
  }
};

export const UserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("All fields required");
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (!existingUser) {
      const error = new Error("Email not registered");
      error.statusCode = 401;
      return next(error);
    }

    const isVerified = await bcrypt.compare(password, existingUser.password);
    if (!isVerified) {
      const error = new Error("Password didn't match");
      error.statusCode = 401;
      return next(error);
    }

    // ✅ Token generate using genToken from utils
    const token = genToken(existingUser);

    res.status(200).json({
      message: "Login Successful",
      data: {
        id: existingUser._id,
        fullName: existingUser.fullName,
        email: existingUser.email,
        phone: existingUser.phone,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};
