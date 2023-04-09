import { Checkbox } from "@mui/material";

const commonInputProps = {
  margin: "normal",
  required: true,
  fullWidth: true,
};

export const getFormInputProps = ({ formId, formInputs }) => {
  if (formId === "SIGNUP") {
    const { userName, shopName, email, password, confirmPassword } = formInputs;
    return [
      {
        id: "userName",
        type: "text",
        value: userName,
        placeholder: "Username",
        autoFocus: true,
        label: "userName",
        name: "userName",
        ...commonInputProps,
      },
      {
        id: "shopName",
        type: "text",
        value: shopName,
        placeholder: "Shop Name",
        label: "shopName",
        name: "shopName",
        ...commonInputProps,
      },
      {
        id: "email",
        type: "email",
        value: email,
        placeholder: "Email Address",
        label: "Email Address",
        name: "email",
        autoComplete: "email",
        ...commonInputProps,
      },
      {
        id: "password",
        type: password,
        value: password,
        placeholder: "Password",
        label: "Password",
        name: "Password",
        ...commonInputProps,
      },
      {
        id: "confirmPassword",
        type: password,
        value: confirmPassword,
        placeholder: "Confirm Password",
        label: "Confirm Password",
        name: "Confirm Password",
        ...commonInputProps,
      },
      {
        id: "signUpButton",
        type: "submit",
        fullWidth: true,
        variant: "contained",
        sx: { mt: 3, mb: 2 },
        value: "Sign Up",
      },
    ];
  } else {
    const { email, password } = formInputs;
    return [
      {
        id: "email",
        type: "email",
        value: email,
        label: "Email Address",
        name: "email",
        autoComplete: "email",
        autoFocus: true,
        ...commonInputProps,
      },
      {
        id: "password",
        type: "password",
        value: password,
        placeholder: "Password",
        name: "password",
        label: "Password",
        ...commonInputProps,
      },
      {
        id: "rememberMeButton",
        label: "Remember me",
        type: "checkBox",
        control: <Checkbox value="remember" color="primary" />,
      },
      {
        id: "loginButton",
        type: "submit",
        fullWidth: true,
        variant: "contained",
        sx: { mt: 3, mb: 2 },
        value: "Login",
      },
    ];
  }
};
