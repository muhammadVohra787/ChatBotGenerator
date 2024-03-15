import React from "react";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Modal,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { usePost } from "../api/user-authentication";
import useValidation from "../api/input-validation";
import SignIn from "./SignInModal";
import { useModal } from "./userInput/use-modal";
import ModalMessage from "./modal/ModalMessage";
import ResponseIcon from "./userInput/ResponseIcon";

export default function SignUp({ type, text, style }) {
  const {
    loginMsgBox,
    setLoginMsgBox,
    responseMsg,
    setResponseMsg,
    open,
    setOpen,
    handleCloseAll,
    handleMsgBoxClose,
    handleToggle,
  } = useModal();

  const { validate, errors: validationErrors } = useValidation();
  const { isPending, mutateAsync } = usePost();

  const handleSubmit = (event) => {
    event.preventDefault();
    const dataForm = new FormData(event.currentTarget);
    const userData = {
      email: dataForm.get("email"),
      password: dataForm.get("password"),
      name: dataForm.get("firstName") + " " + dataForm.get("lastName"),
    };

    const nameValidation = validate("name", userData.name);
    const emailValidation = validate("email", userData.email);
    const passwordValidation = validate("password", userData.password);

    if (nameValidation && emailValidation && passwordValidation) {
      setLoginMsgBox(true);
      setResponseMsg({
        responseMsg: "",
        type: "",
        icon: "",
      });

      mutateAsync({ postData: userData, url: "createuser" }).then((res) => {
        setLoginMsgBox(true);
        setResponseMsg({
          messageRes: res.data.message,
          type: res.data.type ? "success" : "error",
          icon: <ResponseIcon icon={res.data.type} />,
        });
        if (res.data.type) {
          setTimeout(() => {
            setResponseMsg(false);
            setOpen(false);
            setLoginMsgBox(false);
          }, 1500);
        }
      });
    }
  };

  return (
    <Box
      sx={{
        paddingRight: "10px",
        margin: "0px",
      }}
    >
      <Button
        variant={type}
        color="primary"
        onClick={handleToggle}
        className="RegisterBtn"
        sx={{
          ...style,
          pt: 1.2,
        }}
      >
        {text}
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button
              onClick={handleCloseAll}
              style={{
                position: "fixed",
                top: 25,
                right: 25,
                padding: 0,
                minWidth: 0,
                margin: 0,
              }}
            >
              <CloseIcon />
            </Button>
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    error={!!validationErrors.name}
                    helperText={validationErrors.name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    error={!!validationErrors.name}
                    helperText={validationErrors.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    error={!!validationErrors.email}
                    helperText={validationErrors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    error={!!validationErrors.password}
                    helperText={validationErrors.password}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <a onClick={handleCloseAll}>
                    <SignIn
                      text="Already have an account? Sign in"
                      type="text"
                      style={{ fontSize: "12px" }}
                    />
                  </a>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Modal>

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
    </Box>
  );
}
