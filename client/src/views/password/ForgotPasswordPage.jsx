import React from "react";
import { usePost } from "../../api/user-authentication";
import useValidation from "../../api/input-validation";
import {
  Box,
  Modal,
  Button,
  TextField,
  Typography,
  Container,
} from "@mui/material";
import { useModal } from "../../components/userInput/use-modal";
import ModalMessage from "../../components/modal/ModalMessage";
import { useNavigate } from "react-router-dom";
import ResponseIcon from "../../components/userInput/ResponseIcon";

const ForgotPasswordPage = () => {
  const { validate, errors: validationErrors } = useValidation();
  const { isPending, mutateAsync } = usePost();
  const navigate = useNavigate();
  const {
    loginMsgBox,
    setLoginMsgBox,
    responseMsg,
    setResponseMsg,
    setOpen,
    handleMsgBoxClose,
  } = useModal();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataForm = new FormData(event.currentTarget);
    const userData = {
      email: dataForm.get("email"),
    };

    const emailValidation = validate("email", userData.email);

    if (emailValidation) {
      setOpen(true);
      setLoginMsgBox(true);
      setResponseMsg({
        responseMsg: "",
        type: "",
        icon: "",
      });
      try {
        const res = await mutateAsync({ postData: userData, url: "sndlink" });
        setResponseMsg({
          messageRes: res.data.message,
          type: res.data.type ? "success" : "error",
          icon: <ResponseIcon icon={res.data.type} />,
        });
        if (res.data.type) {
          navigate(`/cf83e1357eefb8bdf/${userData.email}`);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
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
            If your email checks out, we will send you a verification code
          </Typography>
          <br />
          <br />
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

export default ForgotPasswordPage;
