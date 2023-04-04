import axios from "axios";
import { Navigate } from "react-router-dom";

const allValidCharacters =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export const generateRandomPassword = () => {
  const passwordLength = 9;
  let randomPassword = "";
  for (let i = 0; i < passwordLength; ++i) {
    randomPassword += allValidCharacters.charAt(
      Math.floor(Math.random() * allValidCharacters.length)
    );
  }
  return randomPassword;
};

export const comparePassword = ({ password, confirmPassword }) => {
  const doPasswordMatch = password === confirmPassword;
  if (doPasswordMatch)
    setAlboxcont({
      open: true,
      message: "Please Use a Valid Email..!!",
      type: "error",
      dur: 5000,
    });
  else
    setAlboxcont({
      open: true,
      message: "Please Use a Valid Email..!!",
      type: "error",
      dur: 5000,
    });
  return;
};

export const verifyEmail = async ({ email }) => {
  const response = await axios.post(`/app/selfproxy/${email}`);
  const { isEmailCorrect } = await response.data;
  if (isEmailCorrect) {
    return true;
  } else {
    setAlboxcont({
      open: true,
      message: "Please Use a Valid Email..!!",
      type: "error",
      dur: 5000,
    });
    return false;
  }
};

export const authenticateUser = async () => {
  try {
    const response = await axios.get("/app/main", { withCredentials: true });
    const userdata = await response.data;
    if (userdata) Navigate("/dashboard");
  } catch (error) {
    Navigate("/");
    console.log(error);
  }
};
