export const getSignupFormInputs = ({ signUpFormData }) => {
  const { userName, shopName, email, password, confirmPassword } =
    signUpFormData;
  return [
    {
      id: "userName",
      type: "text",
      value: userName,
      placeholder: "Username",
    },
    {
      id: "shopName",
      type: "text",
      value: shopName,
      placeholder: "Shop Name",
    },
    {
      id: "email",
      type: "email",
      value: email,
      placeholder: "Email Address",
    },
    {
      id: "password",
      type: password,
      value: password,
      placeholder: "Password",
    },
    {
      id: "confirmPassword",
      type: password,
      value: confirmPassword,
      placeholder: "Confirm Password",
    },
    {
      id: "signupButton",
      type: "submit",
      value: "Signup",
      className: "btn",
    },
  ];
};

export const getLoginFormInputs = ({ loginFormData }) => {
  const { email, password } = loginFormData;
  return [
    {
      id: "email",
      type: "email",
      value: email,
      placeholder: "Email Address",
    },
    {
      id: "password",
      type: password,
      value: password,
      placeholder: "Password",
    },
    {
      id: "forgotPassworButton",
      type: "button",
    },
    {
      id: "loginButton",
      type: "submit",
      value: "Login",
      className: "btn",
    },
  ];
};
