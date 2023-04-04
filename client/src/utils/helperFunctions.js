import axios from "axios";
import { Navigate } from "react-router-dom";
import { setToastMessage } from "state";

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

export const comparePassword = ({ password, confirmPassword, dispatch }) => {
  const doPasswordMatch = password === confirmPassword;
  if (doPasswordMatch) dispatch(setToastMessage({ message: "LoggedIn" }));
  else dispatch(setToastMessage({ message: "LoggedIn" }));

  return;
};

export const verifyEmail = async ({ email, dispatch }) => {
  const response = await axios.post(`/app/selfproxy/${email}`);
  const { isEmailCorrect } = await response.data;
  if (isEmailCorrect) {
    return true;
  } else {
    dispatch(setToastMessage({ message: "LoggedIn" }));
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
