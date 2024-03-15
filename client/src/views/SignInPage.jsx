import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Modal,
  Container,
  Alert,
} from "@mui/material";
import { useModal } from "../components/userInput/use-modal";
import ModalMessage from "../components/modal/ModalMessage";
import ResponseIcon from "../components/userInput/ResponseIcon";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { usePost } from "../api/user-authentication";
import useValidation from "../api/input-validation";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import SignUp from "../components/SignUpModal";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { useNavigate, Link } from "react-router-dom";
import { useLastLocation } from "../PrivateRoutes";
import { useEffect, useState } from "react";

export default function SignIn({ showError = true }) {
  const {
    loginMsgBox,
    setLoginMsgBox,
    responseMsg,
    setResponseMsg,
    setOpen,
    handleCloseAll,
    handleMsgBoxClose,
  } = useModal();
  const { validate, errors: validationErrors } = useValidation();
  const { isPending, mutateAsync } = usePost();
  const { lastLocation } = useLastLocation();
  const lastPathname = lastLocation ? lastLocation.pathname : -1;
  const navigate = useNavigate();
  const signInContext = useSignIn();
  const isAuthenticated = useIsAuthenticated();
  useEffect(() => {
    if (showError && isAuthenticated()) {
      navigate(lastPathname);
    }
  }, [isAuthenticated()]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const dataForm = new FormData(event.currentTarget);
    const userData = {
      email: dataForm.get("email"),
      password: dataForm.get("password"),
    };

    const emailValidation = validate("email", userData.email);
    const passwordValidation = validate("password", userData.password);

    if (emailValidation && passwordValidation) {
      setLoginMsgBox(true);
      setResponseMsg({
        responseMsg: "",
        type: "",
        icon: "",
      });

      mutateAsync({ postData: userData, url: "login" }).then((res) => {
        if (res.data.type) {
          signInContext({
            expireIn: res.data.expiresIn,
            userState: {
              user_id: res.data.userId,
            },
            auth: {
              token: res.data.token,
              type: "Bearer",
            },
          });
          setTimeout(() => {
            if (showError) {
              navigate(lastPathname);
            } else {
              window.location.reload();
            }
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
      {!isAuthenticated() ? (
        <Alert variant="outlined" severity="error">
          Please Sign In First
        </Alert>
      ) : (
        <Alert variant="outlined" severity="success">
          You are Signed In
        </Alert>
      )}
      <Box
        sx={{
          marginTop: 8,
          mb: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main", alignItems: "center" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
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
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            error={!!validationErrors.password}
            helperText={validationErrors.password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isAuthenticated()}
          >
            Sign In
          </Button>
        </Box>
        <Grid container item sx={{ p: 0 }}>
          <Grid item>
            <Link
              to="/forgotPassword"
              onClick={handleCloseAll}
              component="button"
              style={{
                color: "#080a45",
                fontWeight: 500,
              }}
            >
              FORGOT PASSWORD?
            </Link>
          </Grid>
          <Grid item xs={10}>
            <a onClick={handleCloseAll}>
              <SignUp
                type="text"
                text={"Don't have an account? Sign Up"}
                style={{
                  fontSize: "15px",
                  p: 0,
                  m: 0,
                  flexDirection: "end",
                }}
              />
            </a>
          </Grid>
        </Grid>
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
