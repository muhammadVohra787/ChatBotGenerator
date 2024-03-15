import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
  Modal,
  Container,
} from "@mui/material";
import { useModal } from "../../components/userInput/use-modal";
import ModalMessage from "../../components/modal/ModalMessage";
import ResponseIcon from "../../components/userInput/ResponseIcon";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { usePost } from "../../api/user-authentication";
import useValidation from "../../api/input-validation";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { useNavigate } from "react-router-dom";
import { useLastLocation } from "../../PrivateRoutes";
import { useEffect, useState } from "react";

export default function ChangePassword() {
  const {
    loginMsgBox,
    setLoginMsgBox,
    responseMsg,
    setResponseMsg,
    setOpen,
    handleMsgBoxClose,
  } = useModal();
  const { validate, errors: validationErrors } = useValidation();
  const { isPending, mutateAsync } = usePost();
  const { lastLocation } = useLastLocation();
  const lastPathname = lastLocation ? lastLocation.pathname : -1;
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate(lastPathname);
    }
  }, [isAuthenticated()]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const dataForm = new FormData(event.currentTarget);
    const userData = {
      email: dataForm.get("email"),
      lastPassword: dataForm.get("password"),
      newPassword: dataForm.get("newPassword"),
    };

    const emailValidation = validate("email", userData.email);
    const passwordValidation = validate("password", userData.lastPassword);
    const newPassword = validate("newPassword", userData.newPassword);
    const newPasswordR = validate(
      "newPasswordR",
      dataForm.get("newPasswordR"),
      userData.newPassword
    );
    console.log(userData);
    console.log(newPasswordR);
    if (emailValidation && passwordValidation && newPassword && newPasswordR) {
      setLoginMsgBox(true);
      setResponseMsg({
        responseMsg: "",
        type: "",
        icon: "",
      });

      mutateAsync({ postData: userData, url: "updatepassword" }).then((res) => {
        if (res.data.type) {
          setTimeout(() => {
            navigate("/");
            setResponseMsg(false);
            setOpen(false);
            setLoginMsgBox(false);
          }, 1500);
        }
        setLoginMsgBox(true);
        setResponseMsg({
          messageRes: res.data.message,
          type: res.data.type ? "success" : "error",
          icon: <ResponseIcon icon={res.data.type} />,
        });
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <br />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main", alignItems: "center" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Change Your Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
          <br />
          <br />
          <TextField
            required
            fullWidth
            name="password"
            label="Enter Old Password"
            type="password"
            id="password"
            autoComplete="new-password"
            error={!!validationErrors.password}
            helperText={validationErrors.password}
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 10 }}
          >
            Change Password
          </Button>
        </Box>
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
  );
}
