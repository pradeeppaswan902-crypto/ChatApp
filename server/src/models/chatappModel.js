import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    password: {
      type: String,
    },
  },
  { timestamps: true },
);

const CHATAPP = mongoose.model("Chatapp", userSchema);

export default CHATAPP;
