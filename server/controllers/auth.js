import bcrypt from "bcrypt";
import User from "../models/User.js";
import { WEB_APP_TOKEN } from "../utils/constants.js";

const cookieOption = {
  expires: new Date(Date.now() + 25892000000),
  httpOnly: true,
  secure: true,
  sameSite: "none",
};

export const handleUserSignup = async (req, res) => {
  try {
    const { userName, shopName, email, password } = req.body;
    if (!email || !password || !userName || !shopName) {
      res.status(400).json({ message: "Please Fill All The Details..!!" });
    }
    if (password.length < 8) {
      res
        .status(400)
        .json({ message: "Minimum Password Length Is 8 Characters" });
    }

    const doeUserExist = await User.findOne({ email });
    if (doeUserExist) {
      res.status(400).json({ message: "Email-Id Already Registered..!!" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName,
      shopName,
      email,
      password: hashedPassword,
    });

    newUser
      .save()
      .then(() =>
        res.status(200).json({ message: "Registration Successful..!!" })
      )
      .catch((error) => res.status(500).json(error));
  } catch (error) {
    res.status(500).json(error);
  }
};

export const handleUserLogin = async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please Fill All The Details..!!" });
    }
    const selectedUser = await User.findOne({ email });
    if (!selectedUser) {
      res
        .status(400)
        .json({ message: "Email-Id Not Recognized. Please SignUp With Us" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      selectedUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "InCorrect Password" });
    }

    token = await selectedUser.generateAuthToken();
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.cookie(WEB_APP_TOKEN, token, cookieOption);
    res
      .status(200)
      .json({ message: `Login SuccessFull..!!`, userId: selectedUser._id });
  } catch (error) {
    console.log(error);
  }
};

export const checkUserAuthenticity = (req, res) => {
  res.status(200).json({ rootUserId: req.rootUser._id });
};

export const handleUserLogout = (req, res) => {
  res.clearCookie(WEB_APP_TOKEN, { path: "/" });
  res.status(200).send("User LoggedOut");
};

export const sendOtpToUserEmail = async (req, res) => {
  try {
    const { emailId } = req.params;
    const user = await User.findById(id);
    const emailJsMailParams = {
      user: emailId,
      message: generateOTP(),
      to_name: user.fullName,
      from_name: "E-Commerce Manager",
    };
    const emailJsResponse = await emailjs.send(
      "service_9bpsy9c",
      "template_v545mxb",
      emailJsMailParams
    );
    res.status(200).json(emailJsResponse);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
