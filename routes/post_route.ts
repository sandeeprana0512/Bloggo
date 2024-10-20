import express from "express";
import { verifyToken } from "../middleware/verifyJWT";
const router = express.Router();
import { getAllPosts, newPost, deletePost, likePost, editPost, getPost } from "../controller/post_controller";

router.get("/", getAllPosts);
router.post("/new-post/:userId", verifyToken, newPost);
router.post("/like-post/:userId/:postId", verifyToken, likePost);
router.patch("/edit-post/:userId/:postId", verifyToken, editPost);
router.get("/get-post/:postId", getPost);
router.delete("/delete-post/:userId/:postId", verifyToken, deletePost);

export default router;