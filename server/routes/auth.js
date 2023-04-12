import express from "express";
import { handleUserSignup, handleUserLogin } from "../controllers/auth";

const router = express.Router();
router.post("/login", handleUserLogin).post("/signup", handleUserSignup);
export default router;
