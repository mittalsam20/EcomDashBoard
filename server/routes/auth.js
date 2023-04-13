import express from "express";
import {
  handleUserLogin,
  handleUserLogout,
  handleUserSignup,
  checkUserAuthenticity,
} from "../controllers/auth.js";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();
router
  .post("/login", handleUserLogin)
  .post("/signup", handleUserSignup)
  .get("/checkUserAuthenticity", AuthMiddleware, checkUserAuthenticity)
  .get("/logout", handleUserLogout);

export default router;
