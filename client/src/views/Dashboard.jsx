import React, { useEffect, useState } from "react";
import { usePost } from "../api/user-authentication";
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
  Tooltip,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
const Dashboard = () => {
  const auth = useAuthUser();
  const authUserId = auth && auth.user_id;
  const navigate = useNavigate();
  const { isPending: isPending1, mutateAsync: mutateAsync1 } = usePost();
  const { isPending: isPending2, mutateAsync: mutateAsync2 } = usePost();
  const { isPending: isPending3, mutateAsync: mutateAsync3 } = usePost();
  const [showError, setError] = useState({
    show: false,
    message: "",
  });
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
        if (!res.data.type) {
          setError({
            show: true,
            message: res.data.message,
          });
          setTimeout(() => {
            setError({
              show: false,
              message: "",
            });
          }, 2500);
        }
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
    var message = "";
    var chatLength = allChats.chatName && allChats.chatName.length;

    if (name === "chatName") {
      if (allChats.findIndex((chat) => chat.chatname === value) !== -1) {
        isValid = true;
        message = "You already have a chat with this name";
      }
      if (value.length < 5) {
        isValid = true;
        message = "Name Must Be Longer Than 5 letters/digits";
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
    window.open(`/dnd/${currItem}`, "_blank");
  };
  const handlePreviewChat = (index) => {
    const currItem = allChats[index].chatname;
    window.open(`/previewChat/${currItem}`, "_blank");
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
      {showError.show && <Alert severity="error">{showError.message}</Alert>}
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
                    <Tooltip title="Delete">
                      <IconButton
                        sx={{
                          p: 0,
                          mr: 1,
                          ml: 1,
                        }}
                        onClick={() => {
                          handleWarningDelete(index);
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <div>
                    <Tooltip title="Edit">
                      <IconButton
                        sx={{
                          p: 0,
                          mr: 1,
                          ml: 1,
                        }}
                        onClick={() => {
                          handleEditChat(index);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <div>
                    <Tooltip title="Preview Chat">
                      <IconButton
                        sx={{
                          p: 0,
                          mr: 3,
                          ml: 1,
                        }}
                        onClick={() => {
                          handlePreviewChat(index);
                        }}
                      >
                        <RemoveRedEyeOutlinedIcon />
                      </IconButton>
                    </Tooltip>
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
