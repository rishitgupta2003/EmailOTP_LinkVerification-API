import { Router } from "express";
import { registerUser, loginUser, verifyUserLink, verifyUserOTP } from "../controllers/user.controller.js";

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/verifyToken').post(verifyUserLink);
router.route('/verifyOTP').post(verifyUserOTP);

export default router;