import express from "express";
import postController from "../controller/postController";
import { verifyToken, verifyTokenAndAuthorization } from "../middleware/verifyToken";

const router = express.Router({mergeParams : true});

router.get("/", postController.getAllPost);
router.post("/upload",verifyToken, postController.uploadPost);
router.delete("/:id",verifyTokenAndAuthorization, postController.deletePost);
router.get("/:id",verifyTokenAndAuthorization, postController.getPostById);
router.put("/:id",verifyTokenAndAuthorization, postController.updatePost);

export default router;
