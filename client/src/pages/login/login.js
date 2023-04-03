import { useState, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";

import axios from "axios";
import Button from "@material-ui/core/Button";

import "./logsign.scss";
import Carousel from "UIComponents/carousel";
import ForgotPasswordModal from "./forgotPasswordModal";
import { comparePassword, verifyEmail } from "utils/helperFunctions";
import { getLoginFormInputs, getSignupFormInputs } from "./localConstants";

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

const Login = () => {
  const [loginFormData, setLoginFormData] = useState(initialLoginFormData);
  const [signUpFormData, setsignUpFormData] = useState(initialSignUpFormData);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const { userName, shopName, email, password, confirmPassword } =
    signUpFormData;
  const { email: loginEmail, password: loginPassword } = loginFormData;
  const signupFormInputs = getSignupFormInputs({ signUpFormData });
  const loginFormInputs = getLoginFormInputs({ loginFormData });

  const onChangeValue =
    ({ id, stateId }) =>
    (e) => {
      const value = e.target.value;
      if (stateId === "LOGIN_FORM")
        setLoginFormData((prevState) => ({ ...prevState, [id]: value }));
      else if (stateId === "SIGNUP_FORM") {
        setsignUpFormData((prevState) => ({ ...prevState, [id]: value }));
        if (id === "password" || id === "confirmPassword")
          comparePassword({ password, confirmPassword });
      }
    };

  const onClickForgotPassword = (event) => {
    event.preventDefault();
    setShowForgotPasswordModal(true);
  };

  const onClickLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/app/login", loginFormData, {
        withCredentials: true,
      });
      const { data, status } = response;
      if (status === 200) {
        setAlboxcont({
          open: true,
          message: data.message,
          type: "success",
          dur: 6000,
        });
        setLoginFormData(initialLoginFormData);
        Navigate("/dashboard");
      }
    } catch (error) {
      setAlboxcont({
        open: true,
        message: data.message,
        type: "error",
        dur: 6000,
      });
    }
  };

  const onClickSignUp = async (event) => {
    event.preventDefault();
    try {
      const isEmailCorrect = verifyEmail({ email });
      if (!isEmailCorrect) throw new Error("Fake Email");
      // PasswordCheck
      const response = await axios.post("/app/signup", signUpFormData);
      const { status } = response;
      if (status !== 200) throw new Error("lets see");
      setsignUpFormData(initialSignUpFormData);
    } catch (error) {
      setAlboxcont({
        open: true,
        message: error.response.data.message,
        type: temptype || "success",
        dur: 6000,
      });
    }
  };

  return (
    <div className="main-container">
      <div id="sign-up" className="left-container sign-up ">
        <ForgotPasswordModal />

        <h1>{"Ecommerce Manager"}</h1>
        <section className="main">
          <div className="form_wrapper">
            <input
              id="login"
              name="radio"
              type="radio"
              defaultChecked
              className="radio"
            />
            <input id="signup" type="radio" className="radio" name="radio" />
            <label className="tab login_tab" for="login">
              {"Login"}
            </label>
            <label className="tab signup_tab" for="signup">
              {"Signup"}
            </label>
            <span className="shape"> </span>

            <div className="form_wrap">
              <div className="form_fild login_form">
                {loginFormInputs.map(({ id, type, ...restProps }) => {
                  return type === "submit" ? (
                    <input id type {...restProps} onClick={onClickLogin} />
                  ) : type === "button" ? (
                    <Button id onClick={onClickForgotPassword}>
                      {"Forgot password ?"}
                    </Button>
                  ) : (
                    <div className="input_group">
                      <input
                        id
                        type
                        className={"input"}
                        onChange={onChangeValue({ id, stateId: "LOGIN_FORM" })}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="form_fild signup_form">
                {signupFormInputs.map(({ id, type, ...restProps }) => {
                  return type === "submit" ? (
                    <input id type {...restProps} onClick={onClickSignUp} />
                  ) : (
                    <div className="input_group">
                      <input
                        id
                        type
                        className={"input"}
                        onChange={onChangeValue({ id, stateId: "SIGNUP_FORM" })}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="right-container">
        <Carousel className="right-in" />
      </div>
    </div>
  );
};

export default Login;
