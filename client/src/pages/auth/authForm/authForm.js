import React from "react";

import {
  Box,
  Grid,
  Avatar,
  Button,
  TextField,
  Typography,
  FormControlLabel,
} from "@mui/material";

const Copyright = () => {
  return (
    <Typography
      sx={{ mt: 5 }}
      align={"center"}
      variant={"body2"}
      color={"text.secondary"}
    >
      {`Copyright ©  Ecom-Shop-Manager ${new Date().getFullYear()}.`}
    </Typography>
  );
};

const AuthForm = (props) => {
  const {
    activeForm,
    toggleForm,
    onClickLogin,
    onClickSignUp,
    onChangeValue,
    formInputProps,
    onClickForgotPassword,
  } = props;

  const { formId } = activeForm;
  const onSubmit = formId === "LOGIN" ? onClickLogin : onClickSignUp;

  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} />
      <Typography component="h1" variant="h5">
        {formId === "LOGIN" ? "Login" : "SignUp"}
      </Typography>
      <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
        {formInputProps.map(({ id, type, value, ...restProps }) => {
          return type === "submit" ? (
            <Button id={id} type={type} {...restProps} onClick={onSubmit}>
              {value}
            </Button>
          ) : type === "checkBox" ? (
            <FormControlLabel id={id} type={type} {...restProps} />
          ) : (
            <TextField
              id={id}
              type={type}
              value={value}
              {...restProps}
              onChange={onChangeValue({ id })}
            />
          );
        })}
        <Grid container>
          <Grid item xs>
            {formId === "LOGIN" && (
              <Button onClick={onClickForgotPassword}>
                {"Forgot password?"}
              </Button>
            )}
          </Grid>
          <Grid item>
            <Button onClick={toggleForm}>
              {formId === "LOGIN"
                ? "Don't have an account? Sign Up"
                : "Already SignedUp? Login"}
            </Button>
          </Grid>
        </Grid>
        <Copyright />
      </Box>
    </>
  );
};

export default AuthForm;
