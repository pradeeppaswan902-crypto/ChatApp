import express from "express";
import { UserRegister, UserLogin } from "../controllers/SignupUser.js"
//import Protect from '../middleware/authMiddleware.js'


const router = express.Router();

router.post("/signup",  UserRegister);
router.post("/login",  UserLogin);

export default router;





