import express from "express";
import authController from "../controller/auth/authController";
import { requestRefreshToken } from "../controller/auth/token";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout",verifyToken, authController.logout);
router.post("/refresh",requestRefreshToken);


export default router;
