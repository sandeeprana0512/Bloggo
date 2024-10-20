import express from "express";
const router = express.Router();
import { registerUser, loginUser, logout } from "../controller/auth_controller";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);

export default router;