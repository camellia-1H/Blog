import express from "express";
import { postRouter } from ".";
import userController from "../controller/userController";

const router = express.Router();


router.get('/:userid', userController.getProfile)
router.use("/:userid/post", postRouter)

export default router;
