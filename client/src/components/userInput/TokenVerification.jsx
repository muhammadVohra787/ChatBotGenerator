import React, { useState } from "react";
import { usePost } from "../../api/user-authentication";
import useValidation from "../../api/input-validation";
import {
  Box,
  Modal,
  Button,
  TextField,
  Typography,
  Container,
  Alert,
} from "@mui/material";
import { useModal } from "./use-modal";
import ModalMessage from "../modal/ModalMessage";
import { useLastLocation } from "../../PrivateRoutes";
import { useNavigate } from "react-router-dom";
import ResponseIcon from "./ResponseIcon";
import { useParams } from "react-router-dom";

const TokenVerify = () => {
  const { validate, errors: validationErrors } = useValidation();
  const { isPending, mutateAsync } = usePost();
  const { lastLocation } = useLastLocation();
  const navigate = useNavigate();
  const { email } = useParams();
  if (email === "" || email === null) {
    lastLocation ? navigate("/") : navigate(lastLocation);
  }
  console.log("From cmp: ", email);
  const {
    loginMsgBox,
    setLoginMsgBox,
    responseMsg,
    setResponseMsg,
    handleMsgBoxClose,
  } = useModal();
  const handleSubmit = (event) => {
    event.preventDefault();
    const dataForm = new FormData(event.currentTarget);
    const userData = {
      verificationCode: dataForm.get("verificationCode"),
      newPassword: dataForm.get("newPassword"),
      email: email,
    };
    const verificationCode = validate(
      "verificationCode",
      userData.verificationCode
    );
    const newPassword = validate("newPassword", userData.newPassword);
    const newPasswordR = validate(
      "newPasswordR",
      dataForm.get("newPasswordR"),
      userData.newPassword
    );
    if (verificationCode && newPassword && newPasswordR) {
      setLoginMsgBox(true);
      setResponseMsg({
        responseMsg: "",
        type: "",
        icon: "",
      });
      console.log("making request now");
      mutateAsync({ postData: userData, url: "verifyToken" }).then((res) => {
        console.log(res);
        setResponseMsg({
          messageRes: res.data.message,
          type: res.data.type ? "success" : "error",
          icon: <ResponseIcon icon={res.data.type} />,
        });
        if (res.data.type) {
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      });
    }
  };
  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "20px",
        }}
      >
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Typography variant="h6" color="initial">
            We just send you an email, your code expires in next 20 minutes
          </Typography>
          <Typography variant="h6" color="initial">
            Can't find it? Give it a few minutes
          </Typography>
          <Button variant="text" color="error">
            Send Again
          </Button>
          <br />
          <br />
          <TextField
            required
            fullWidth
            name="verificationCode"
            label="Enter Your 7 digit Verification Code"
            type="verificationCode"
            id="verificationCode"
            autoComplete={"off"}
            error={!!validationErrors.verificationCode}
            helperText={validationErrors.verificationCode}
          />
          <br />
          <br />
          <TextField
            required
            fullWidth
            name="newPassword"
            label="New Password"
            type="password"
            id="newPassword"
            autoComplete={"off"}
            error={!!validationErrors.newPassword}
            helperText={validationErrors.newPassword}
          />
          <br />
          <br />

          <TextField
            required
            fullWidth
            name="newPasswordR"
            label="Repeat New Password"
            type="password"
            id="newPasswordR"
            autoComplete={"off"}
            error={!!validationErrors.newPasswordR}
            helperText={validationErrors.newPasswordR}
          />
          <br />
          <br />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
        <Modal
          open={loginMsgBox}
          onClose={handleMsgBoxClose}
          aria-labelledby="message-modal-title"
          aria-describedby="message-modal-description"
        >
          <>
            <ModalMessage
              isPending={isPending}
              responseMsg={responseMsg}
            ></ModalMessage>
          </>
        </Modal>
      </Container>
    </>
  );
};

export default TokenVerify;
