import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { WEB_APP_TOKEN } from "../utils/constants.js";

export const authMiddleware = async (req, res, next) => {
  try {
    console.log("ssss", req.cookies);
    const token = req.cookies[WEB_APP_TOKEN];
    const verifyToken = jwt.verify(
      token,
      process.env.USER_JWT_TOKEN_SECRET_KEY
    );
    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    if (!rootUser) {
      throw new Error("User Not Found..!!");
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;
    next();
  } catch (error) {
    res.status(401).send("UnAuthorized: No Token is Being Provided.");
    console.log(error);
  }
};
