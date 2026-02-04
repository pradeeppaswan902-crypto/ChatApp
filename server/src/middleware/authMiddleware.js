import jwt from "jsonwebtoken";
import ChatApp from "../models/chatappModel.js";

export const Protect = async (req, res, next) => {
  try {
    const token = req.cookies.chatApp;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized! Please login again",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const verifiedUser = await ChatApp.findById(decoded.userId);
    if (!verifiedUser) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized! Please login again",
      });
    }

    req.user = verifiedUser;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
