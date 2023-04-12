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
