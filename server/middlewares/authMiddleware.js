const jwt = require("jsonwebtoken");
const User = require("../models/User");

const AuthMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.EManagerUserToken;
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

module.exports = AuthMiddleware;
