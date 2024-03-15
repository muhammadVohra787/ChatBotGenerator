import React, { useEffect, useState } from "react";
import { useGet, usePost } from "../api/user-authentication";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import AddIcon from "@mui/icons-material/Add";
import { Typography, Container, Button, Modal, Box, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useModal } from "../components/userInput/use-modal";
import ModalMessage from "../components/modal/ModalMessage";
const Dashboard = () => {
  const navigate = useNavigate();
  const { isPending, mutateAsync } = usePost();
  const [allChats, setChats] = useState([]);
  const {
    loginMsgBox,
    setLoginMsgBox,
    responseMsg,
    setResponseMsg,
    open,
    setOpen,
    handleMsgBoxClose,
  } = useModal();
  const auth = useAuthUser();
  const handleClick = () => {
    setOpen(true);
  };
  useEffect(() => {
    if (!auth.user_id || auth.user_id === "" || auth.user_id === null) {
      navigate("/dashboard");
    }
  }, [auth.user_id]);
  useEffect(() => {
    mutateAsync({
      postData: { userId: auth.user_id },
      url: "getallchats",
    }).then((res) => {
      if (res.data.type) {
        allChats.push(res.data);
      }
    });
  }, [allChats]);

  return (
    <Container maxWidth="md">
      <Typography variant="h2" color="primary">
        All Chats:{" "}
      </Typography>
      <>
        {allChats ? (
          <>
            <Typography variant="h4">
              So Empty Up In here... Starts making chats now!
            </Typography>
          </>
        ) : (
          <>
            {allChats.map((value) => {
              return <div>{value}</div>;
            })}
          </>
        )}
      </>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        sx={{ mt: 4 }}
        onClick={handleClick}
      >
        Create a new Chat
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
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
            <TextField/>
          </Box>

          {/* <ModalMessage
            isPending={isPending}
            responseMsg={responseMsg}
          ></ModalMessage> */}
        </>
      </Modal>
    </Container>
  );
};

export default Dashboard;
