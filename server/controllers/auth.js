const express = require("express");

const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const User = require("../models/User");

const router = express.Router();
const allNumbers = "0123456789";
router.use(cors());
router.use(bodyParser.urlencoded({ extended: true }));

const cookieOption = {
  expires: new Date(Date.now() + 25892000000),
  httpOnly: true,
};

export const generateOTP = () => {
  const passwordLength = 6;
  let randomPassword = "";
  for (let i = 0; i < passwordLength; ++i) {
    randomPassword += allNumbers.charAt(
      Math.floor(Math.random() * allNumbers.length)
    );
  }
  return randomPassword;
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

    const doeUserExist = await Yser.findOne({ email });
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
      .then((data) =>
        res.status(200).json({ message: "Registration Successful..!!", data })
      )
      .catch((error) => res.status(500).json(error));
  } catch (error) {
    res.status(500).json(error);
  }
};

export const handleUserLogin = async (req, res) => {
  try {
    let token;
    const { email, Password } = req.body;
    if (!email || !Password) {
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
      Password,
      selectedUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "InCorrect Password" });
    }

    token = await selectedUser.generateAuthToken();
    res.cookie("E", token, cookieOption);
    res
      .status(200)
      .json({ message: `Login SuccessFull..!!`, id: selectedUser._id });
  } catch (error) {
    console.log(error);
  }
};

export const checkUserAuthenticity = (req, res) => {
  res.status(200).send(req.rootUser);
};

export const handleUserLogout = (req, res) => {
  res.clearCookie("stgUserToken", { path: "/" });
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

    res.status(200).json(productsWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
