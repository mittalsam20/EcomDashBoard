import React, { useState } from "react";
import UIModal from "UIComponents/UIModal";

const A = () => {
  return (
    <Dialog
      open={forgotOpen}
      onClose={() => {
        setForgotopen(false);
      }}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title"></DialogTitle>
      <DialogContent>
        <TextField
          onChange={(e) => {
            setForemail(e.target.value);
          }}
          autoFocus
          margin="dense"
          id="foremail"
          label="Email-Id"
          type="email"
          fullWidth
          autoComplete="off"
          value={forEmail}
        />
        <DialogActions>
          <Button color="primary">SEND OTP</Button>
        </DialogActions>
      </DialogContent>

      <DialogContent>
        <TextField
          onChange={(e) => {
            setotp(e.target.value);
          }}
          margin="dense"
          id="forotp"
          label="OTP"
          type="text"
          fullWidth
          autoComplete="off"
          value={otp}
        />
        <DialogActions>
          <Button
            onClick={async (e) => {
              e.preventDefault();
              console.log(mailedotp, otp);
              if (mailedotp === Number(otp)) {
                const salt = await bcrypt.genSalt(10);
                const hashednewpass = await bcrypt.hash(newPass, salt);
                var data = JSON.stringify({
                  password: hashednewpass,
                });

                var config = {
                  method: "patch",
                  url: `/app/resetpass/${forUser._id}`,
                  headers: {
                    "Content-Type": "application/json",
                  },
                  data: data,
                };

                axios(config)
                  .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    // setAlboxcont({
                    //   open: true,
                    //   message: "Password Changed..!!",
                    //   type: "success",
                    //   dur: 4000,
                    // });
                  })
                  .catch(function (error) {
                    console.log(error);
                    setAlboxcont({
                      open: true,
                      message: "Server Error..!!",
                      type: "error",
                      dur: 4000,
                    });
                  });

                emailjs
                  .send(
                    "service_9bpsy9c",
                    "template_iibcj0f",
                    {
                      to_name: forUser.fullName,
                      message: newPass,
                      user: forEmail,
                    },
                    "user_JvU7IPyDjI1J1OCd53U8i"
                  )
                  .then(
                    (response) => {
                      setAlboxcont({
                        open: true,
                        message: "NEW PASSWORD HAS BEEN MAILED..!!",
                        type: "success",
                        dur: 7000,
                      });
                      console.log("SUCCESS!", response.status, response.text);
                    },
                    (err) => {
                      console.log("FAILED...", err);
                    }
                  );
              } else {
                setAlboxcont({
                  open: true,
                  message: "OTP ENTERED IS WRONG..!!",
                  type: "error",
                  dur: 7000,
                });
              }
              setForemail("");
              setotp("");
              setForgotopen(false);
            }}
            color="primary"
          >
            Verify OTP
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
const onClickSendOtp = async ({ emailId }) => {
  try {
    const response = await axios.get(`/app/forgotpass/${emailId}`);
    const {
      status,
      data: { fullName },
    } = response;
    if (status === 200) {
      console.log(status);
    }
  } catch (error) {
    console.log(error);
  }
};

const onClickResetPassword = { otp };
const getModalPropsByActionName = ({ actionName, data }) => {
  const { emailId } = data;
  const modalProps = {
    EMAIL: {
      body: () => <></>,
      title: "Reset Password via Email-Id",
      primaryButtonText: "Send OTP",
      secondaryButtonText: "Cancel",
      onClickPrimaryButton: () => onClickSendOtp({ emailId }),
    },
    OTP: {
      body: "",
      title: "Please Verify OTP",
      primaryButtonText: "Reset Password",
      secondaryButtonText: "Resend OTP",
      onClickPrimaryButton: () => {},
      onClickSecondaryButton: () => {},
      executeOnCLoseOnClickSecondaryButton: false,
    },
  };
  return modalProps[actionName];
};

const ForgotPasswordModal = () => {
  const [modalActionDetails, setModalActionDetails] = useState(null);
  const { actionName, data } = modalActionDetails;
  const modalProps = getModalPropsByActionName({ actionName, data });

  return (
    <UIModal
      {...modalProps}
      isOpen={modalActionDetails}
      onClose={() => setModalActionDetails(null)}
    />
  );
};

export default ForgotPasswordModal;
