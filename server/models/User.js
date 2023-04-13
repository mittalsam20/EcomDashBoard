import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    shopName: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    tokens: [
      {
        token: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

UserSchema.methods.generateAuthToken = async function () {
  let currentToken = jwt.sign(
    { _id: this._id },
    process.env.USER_JWT_TOKEN_SECRET_KEY
  );
  this.tokens = this.tokens.concat({ token: currentToken });
  await this.save();
  return currentToken;
};

const User = mongoose.model("User", UserSchema);
export default User;
