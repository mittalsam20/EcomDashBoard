import { setToastMessage } from "../state";

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
  if (doPasswordMatch)
    dispatch(setToastMessage({ message: "Password matches" }));
  else
    dispatch(
      setToastMessage({
        severity: "warning",
        message: "Passwords do not match",
      })
    );

  return;
};

export const verifyEmail = async ({ email, dispatch }) => {
  return true;
  // TODO: Add Proxy route to verify email by TPA.
  // const response = await axios.post(`/app/selfproxy/${email}`);
  // const { isEmailCorrect } = await response.data;
  // if (isEmailCorrect) {
  //   return true;
  // } else {
  //   dispatch(setToastMessage({ message: "LoggedIn" }));
  //   return false;
  // }
};

export const getCurrentPageRouteName = ({ location }) => {
  return location.pathname.split("/").slice(-1)[0];
};

export const getInitialsFromFullName = ({ fullName }) => {
  const fullNameInitials = fullName
    .split(" ")
    .map((name) => name.charAt(0).toUpperCase())
    .join("");
  return fullNameInitials;
};

export const getRandomColorFromString = ({ string }) => {
  let i;
  let hash = 0;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};

export const getFormattedDate = ({ date }) => {
  const dateObject = new Date(date);
  const today = new Date();
  const options = {
    day: "numeric",
    month: "short",
    year:
      today.getFullYear() !== dateObject.getFullYear() ? "2-digit" : undefined,
  };

  const formattedDate = dateObject.toLocaleDateString("en-US", options);
  return formattedDate;
};
