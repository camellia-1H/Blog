import express from "express";
import postController from "../controller/postController";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.get("/", postController.getAllPost)
router.get("/:id", postController.getPostById);
router.post("/upload",verifyToken, postController.uploadPost);


export default router;
