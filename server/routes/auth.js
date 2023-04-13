import express from "express";
import {
  handleUserLogin,
  handleUserLogout,
  handleUserSignup,
  checkUserAuthenticity,
} from "../controllers/auth.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();
router
  .post("/login", handleUserLogin)
  .post("/signup", handleUserSignup)
  .get("/checkUserAuthenticity", authMiddleware, checkUserAuthenticity)
  .get("/logout", handleUserLogout);

export default router;
