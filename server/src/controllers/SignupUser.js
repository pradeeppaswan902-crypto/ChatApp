import User from "../models/chatappModel.js"
import bcrypt from "bcrypt";




export const UserRegister = async (req, res, next) => {
  try {
    console.log(req.body);
    //accept data from Frontend
    const { fullName, email, phone,  password  } = req.body;

    //verify that all data exist
    if (!fullName ||  !email || !phone ||  !password) {
      const error = new Error("All feilds required");
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("Email already registered");
      error.statusCode = 409;
      return next(error);
    }

    console.log("Sending Data to DB");

    //encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    
    //save data to database
    const newUser = await User.create({
      fullName,
      email: email.toLowerCase(),
      phone,
      password: hashPassword,
      
    });

    
    console.log(newUser);
    res.status(201).json({ message: "Registration Successfull" });
    
  } catch (error) {
    next(error);
  }
};

export const UserLogin = async (req, res, next) => {
  conslo.log("Working")
  
  try {
    //Fetch Data from Frontend
    const { email, password } = req.body;

    //verify that all data exist
    if (!email || !password) {
      const error = new Error("All feilds required");
      error.statusCode = 400;
      return next(error);
    }

    //Check if user is registred or not
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const error = new Error("Email not registered");
      error.statusCode = 401;
      return next(error);
    }

    //verify the Password
    const isVerified = await bcrypt.compare(password, existingUser.password);
    if (!isVerified) {
      const error = new Error("Password didn't match");
      error.statusCode = 401;
      return next(error);
    }

    //Token Generation will be done here
    genToken(existingUser, res);

    //send message to Frontend
    res.status(200).json({ message: "Login Successfull", data: existingUser });
    //End
  } catch (error) {
    next(error);
  }
    
};