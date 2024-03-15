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
} from "@mui/material";
import { useModal } from "./userInput/use-modal";
import ModalMessage from "./modal/ModalMessage";
import ResponseIcon from "./userInput/ResponseIcon";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { usePost } from "../api/user-authentication";
import useValidation from "../api/input-validation";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import CloseIcon from "@mui/icons-material/Close";
import SignUp from "./SignUpModal";
import { Link } from "react-router-dom";

export default function SignIn({ type, text, style }) {
  const { validate, errors: validationErrors } = useValidation();
  const { isPending, mutateAsync } = usePost();
  const signInContext = useSignIn();
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
            window.location.reload();
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
    <Box
      sx={{
        paddingRight: "10px",
        margin: "0px",
        textAlign: "start",
      }}
    >
      <Button
        variant={type}
        onClick={handleToggle}
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
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
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
              >
                Sign In
              </Button>
            </Box>
            <Grid container>
              <Grid item xs>
                <Link
                  to="/forgotPassword"
                  onClick={handleCloseAll}
                  component="button"
                  style={{
                    color: "#080a45",
                    fontWeight: 500,
                  }}
                >
                  Forgot Password?
                </Link>
              </Grid>
              <Grid item>
                <a onClick={handleCloseAll}>
                  <SignUp
                    type="text"
                    text={"Don't have an account? Sign Up"}
                    style={{ fontSize: "13px", p: 0 }}
                  />
                </a>
              </Grid>
            </Grid>
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
