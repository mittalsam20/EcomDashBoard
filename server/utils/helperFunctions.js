const otpLength = 6;
const passwordLength = 9;
const allNumbers = "0123456789";

export const generateRandomPassword = () => {
  let randomPassword = "";
  for (let i = 0; i < passwordLength; ++i) {
    randomPassword += allValidCharacters.charAt(
      Math.floor(Math.random() * allValidCharacters.length)
    );
  }
  return randomPassword;
};

export const generateOTP = () => {
  let otp = "";
  for (let i = 0; i < otpLength; ++i) {
    otp += allNumbers.charAt(Math.floor(Math.random() * allNumbers.length));
  }
  return otp;
};
