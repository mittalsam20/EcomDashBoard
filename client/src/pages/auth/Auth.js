import { useState, useLayoutEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import axios from "axios";
import { Box, Grid, CssBaseline } from "@mui/material";

import { setToastMessage, setRootUserId } from "../../state";
import { useDispatch } from "react-redux";

import "./Auth.scss";
import Paper from "@mui/material/Paper";
import AuthForm from "./authForm/authForm";
import Carousel from "../../UIComponents/carousel";
import { getFormInputProps } from "./localConstants";
// import ForgotPasswordModal from "./forgotPasswordModal";
import {
  verifyEmail,
  comparePassword,
  getCurrentPageRouteName,
} from "../../utils/helperFunctions";
import { BASE_URL } from "../../constants/constants";
import { checkUserAuthenticity } from "../../apiFunctions/apiFunctions";

const initialLoginFormData = {
  email: "",
  password: "",
};
const initialSignUpFormData = {
  userName: "",
  shopName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const initialActiveFormState = {
  formId: "LOGIN",
  formInputs: initialLoginFormData,
};
const signUpActiveFormState = {
  formId: "SIGNUP",
  formInputs: initialSignUpFormData,
};

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeForm, setActiveForm] = useState(initialActiveFormState);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const sourceRoute = getCurrentPageRouteName({ location });
  useLayoutEffect(() => {
    checkUserAuthenticity({ sourceRoute, dispatch, navigate });
  }, []);

  const { formId, formInputs } = activeForm;
  // userName, shopName,
  const { email, password, confirmPassword } = formInputs;
  // const { email: loginEmail, password: loginPassword } = loginFormData;
  const formInputProps = getFormInputProps({ formId, formInputs });

  const toggleForm = () => {
    if (formId === "LOGIN") {
      setActiveForm(signUpActiveFormState);
      return;
    }
    setActiveForm(initialActiveFormState);
  };

  const onChangeValue =
    ({ id }) =>
    (event) => {
      const value = event.target.value;
      setActiveForm((prevState) => ({
        ...prevState,
        formInputs: { ...prevState.formInputs, [id]: value },
      }));

      if (
        formId === "SIGNUP" &&
        (id === "password" || id === "confirmPassword")
      )
        comparePassword({ password, confirmPassword, dispatch });
    };

  const onClickForgotPassword = (event) => {
    event.preventDefault();
    setShowForgotPasswordModal(true);
  };

  const onClickLogin = async (event) => {
    event.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(`${BASE_URL}/auth/login`, formInputs, {
        withCredentials: true,
        headers: { "Access-Control-Allow-Origin": "*" },
      });
      const { data, status } = response;
      if (status !== 200) throw new Error("Server Error");
      if (data.userId) {
        dispatch(setToastMessage({ message: data.message }));
        setActiveForm(initialActiveFormState);
        dispatch(setRootUserId({ rootUserId: data.userId }));
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      dispatch(
        setToastMessage({
          message: error.message,
          variant: "error",
        })
      );
    }
  };

  const onClickSignUp = async (event) => {
    event.preventDefault();
    try {
      const isEmailCorrect = verifyEmail({ email });
      if (!isEmailCorrect) throw new Error("Fake Email");
      // PasswordCheck
      const response = await axios.post(`${BASE_URL}/auth/signup`, formInputs);
      const { data, status } = response;
      if (status !== 200) throw new Error("Server Error");
      dispatch(setToastMessage({ message: data.message }));
      setActiveForm(initialActiveFormState);
    } catch (error) {
      console.log({ error });
      dispatch(
        setToastMessage({
          message: error.message,
          severity: "error",
        })
      );
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7}>
        <Carousel />
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <AuthForm
            activeForm={activeForm}
            formInputProps={formInputProps}
            toggleForm={toggleForm}
            onClickLogin={onClickLogin}
            onClickSignUp={onClickSignUp}
            setActiveForm={setActiveForm}
            onChangeValue={onChangeValue}
            onClickForgotPassword={onClickForgotPassword}
          />
        </Box>
      </Grid>
      {showForgotPasswordModal && <></>}
    </Grid>
  );
};

export default Auth;
