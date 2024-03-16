import React, { useEffect, useState } from "react";
import {usePost } from "../api/user-authentication";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import AddIcon from "@mui/icons-material/Add";
import {
  Typography,
  Container,
  Button,
  Modal,
  Box,
  TextField,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

const Dashboard = () => {
  const auth = useAuthUser();
  const authUserId = auth && auth.user_id;
  const navigate = useNavigate();
  const { isPending: isPending1, mutateAsync: mutateAsync1 } = usePost();
  const { isPending: isPending2, mutateAsync: mutateAsync2 } = usePost();
  const { isPending: isPending3, mutateAsync: mutateAsync3 } = usePost();
  const [allChats, setAllChats] = useState([]);
  const [newChatAdded, setNewChatAdded] = useState(false);
  const [warningBox, setWarningBox] = useState({
    show: false,
    message: "",
    preMessage: "",
    chatName: "",
  });
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const [chatName, setChatName] = useState({
    chatName: "",
    helperText: "",
    error: false,
  });
  useEffect(() => {
    if (auth || !authUserId || authUserId === "" || authUserId === null) {
      navigate("/dashboard");
    }
  }, [authUserId]);
  useEffect(() => {

    mutateAsync1({
      postData: { userId: authUserId },
      url: "getallchats",
    }).then((res) => {
      console.log(res.data.data);
      setAllChats(res.data.data);
    });
  }, [newChatAdded]);

  const handleNewNameSubmit = () => {
    if (chatName.error === false) {
      mutateAsync2({
        postData: { chatName: chatName.chatName, userId: authUserId },
        url: "addname",
      }).then((res) => {
        newChatAdded ? setNewChatAdded(false) : setNewChatAdded(true);
        setTimeout(() => {
          setOpen(false);
        }, 1500);
      });
    }
    setChatName({
      chatName: "",
      helperText: "",
      error: false,
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(chatName);
    var isValid = false;
    var message = undefined;
    var chatLength = allChats.chatName && allChats.chatName.length;
    if (name === "chatName") {
      if (
        allChats.findIndex((chat) => chat.chatname === value) !== -1 &&
        chatLength > 2
      ) {
        isValid = true;
        message = "You already have a chat with this name";
      }

      setChatName((prevState) => ({
        ...prevState,
        error: isValid,
        helperText: message,
        chatName: value,
      }));
    }
  };
  const handleWarningDelete = (index) => {
    setWarningBox({
      message: allChats[index].chatname,
      preMessage: `Are you sure you want to delete this item? This can not be undone.`,
      index: allChats[index].id,
      show: true,
    });
  };
  const handleEditChat = (index) => {
    const currItem = allChats[index].chatname;
    navigate(`/dnd/${currItem}`);
  };
  const refreshWarning = () =>
    setWarningBox({
      message: "",
      preMessage: "",
      id: "",
      show: false,
    });
  const handleDelete = async () => {
    mutateAsync3({
      postData: { chatName: warningBox.message, userId: authUserId },
      url: "deletechat",
    }).then((res) => {
      if (res.data.type) {
        const updatedChats = allChats.filter(
          (chat) => chat !== warningBox.index
        );

        setAllChats(updatedChats);
        newChatAdded ? setNewChatAdded(false) : setNewChatAdded(true);
        refreshWarning();
      }
    });
  };
  return (
    <Container maxWidth="md">
      <Typography variant="h2" color="primary">
        All Chats:
      </Typography>
      {isPending1 && <CircularProgress />}
      <br />
      <>
        {allChats === null ? (
          <>
            <Typography variant="h4">
              So Empty Up In here... Starts making chats now!
            </Typography>
          </>
        ) : (
          <>
            {allChats.map((chat, index) => {
              return (
                <Box
                  sx={{
                    bgcolor: "background.paper",
                    boxShadow: 3,
                    p: 2,
                    display: "flex",
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                  key={chat.id}
                >
                  <div>
                    <IconButton
                      sx={{
                        p: 0,
                        pr: 1,
                        pl: 1,
                      }}
                      onClick={() => {
                        handleWarningDelete(index);
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </div>
                  <div>
                    <IconButton
                      sx={{
                        p: 0,
                        pr: 3,
                        pl: 1,
                      }}
                      onClick={() => {
                        handleEditChat(index);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </div>
                  <Typography variant="body1">{chat.chatname}</Typography>
                </Box>
              );
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
      <Modal open={open} onClose={() => setOpen(false)}>
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
            {isPending2 && <CircularProgress />}
            <TextField
              required
              fullWidth
              id="chatName"
              label="Enter a unique Chat Name"
              name="chatName"
              value={chatName.chatName}
              onChange={(e) => {
                handleChange(e);
              }}
              error={chatName.error}
              helperText={chatName.helperText}
              autoComplete="chatName"
              disabled={isPending1}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 2 }}
              onClick={() => handleNewNameSubmit()}
            >
              Add New
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal open={warningBox.show} onClose={refreshWarning}>
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
            {isPending3 && <CircularProgress />}
            <Typography variant="h5" color="primary">
              {warningBox.preMessage}
            </Typography>
            <br />
            <Typography variant="h6" color="primary">
              Item Name: {warningBox.message}
            </Typography>
            <Box sx={{ display: "flex", gap: "8px", pt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                onClick={() => handleDelete()}
              >
                I'm Sure
              </Button>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={refreshWarning}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </>
      </Modal>
    </Container>
  );
};

export default Dashboard;
