import React, { useEffect, useState } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import Container from "@mui/material/Container";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Drawer,
  Button,
  List,
  Divider,
  ListItem,
  ListItemText,
  IconButton,
  Modal,
  CircularProgress,
  Alert,
  Typography,
} from "@mui/material";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import SmsIcon from "@mui/icons-material/Sms";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import ChipComponent from "../components/ChipComponent/Chip";
import TextMessage from "../components/TypesOfInput/TextMesage";
import TextQuestion from "../components/TypesOfInput/TextQuestion";
import SingleSelect from "../components/TypesOfInput/SingleSelect";
import FirstWrapper from "../components/DragNDropWrappers/FirstWrapper";
import { usePost } from "../api/user-authentication";
import { useModal } from "../components/userInput/use-modal";
import ResponseIcon from "../components/userInput/ResponseIcon";
import ModalMessage from "../components/modal/ModalMessage";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const DragNDrop = () => {
  const { isPending: isSavingItems, mutateAsync: saveChatApi } = usePost();
  const { isPending: isGettingChat, mutateAsync: getAllChatApi } = usePost();
  const {
    isPending: isFetchingChatData,
    mutateAsync: getThisChatData,
  } = usePost();
  const [allChats, setAllChats] = useState([]);
  const [newChatAdded, setNewChatAdded] = useState(false);
  const auth = useAuthUser();
  const authUserId = auth && auth.user_id;
  const {
    loginMsgBox,
    setLoginMsgBox,
    responseMsg,
    setResponseMsg,
    setOpen,
    handleMsgBoxClose,
  } = useModal();
  const navigate = useNavigate();
  const { chatname } = useParams();
  const [fetchedData, setFetchedData] = useState([]);
  useEffect(() => {
    getAllChatApi({
      postData: { userId: authUserId },
      url: "getallchats",
    }).then((res) => {
      console.log("res", res);
      setAllChats(res.data.data);
    });
  }, []);
  useEffect(() => {
    if (allChats.length > 0) {
      const itemExists =
        allChats.findIndex((chat) => chat.chatname === chatname) !== -1;
      if (!chatname || chatname === "" || chatname === null || !itemExists) {
        navigate("/dashboard");
      }
      setNewChatAdded(true);
    }
  }, [allChats]);

  useEffect(() => {
    console.log(fetchedData);
  }, [fetchedData]);
  var finalSubmitArr = [];
  const [saved, setSaved] = useState({
    id: "",
    type: "null",
    item: "",
    saved: false,
  });
  const componentMap = {
    TextMessage: TextMessage,
    TextQuestion: TextQuestion,
    SingleSelect: SingleSelect,
  };
  const convertToComponent = (title, props) => {
    if (typeof title === "object") {
      const mergedProps = { ...title.props, ...props };
      return { ...title, props: mergedProps };
    }
    const Component = componentMap[title];

    if (!Component) {
      throw new Error(`Component not found: ${title}`);
    }
    return <Component {...props} />;
  };

  const [dataSet, setData] = useState([]);
  // window.addEventListener('beforeunload', (e) => {
  //   e.preventDefault();
  //   e.returnValue = '';
  //   return 'Are you sure you want to leave this page?';
  // });
  useEffect(() => {
    if (saved.data) {
      const dataProps = {
        data: saved.data,
        maximized: false,
      };
      console.log("ssxxx", saved.item.props.index);
      const existingItem = dataSet[saved.item.props.index];
      if (existingItem) {
        console.log("found saved", existingItem.title.props);
        setData((prevData) => {
          const updatedData = [...prevData];
          updatedData[saved.item.props.index] = {
            id: saved.id,
            type: saved.type,
            title: convertToComponent(saved.item, dataProps),
          };

          return updatedData;
        });
      } else {
        setData((prevData) => [
          ...prevData,
          {
            id: saved.id,
            type: saved.type,
            title: convertToComponent(saved.item, dataProps),
          },
        ]);
      }
      console.log(dataSet);
      resetSaved();
    }
  }, [saved]);
  useEffect(() => {
    console.log(dataSet);
  }, [dataSet]);

  useEffect(() => {
    console.log(saved);
  }, [saved]);
  var tasksLength = dataSet.length;
  const [allItems, setItems] = useState([
    {
      id: tasksLength + 1,
      type: "SingleSelect",
      title: <SingleSelect />,
      thumb: (
        <ChipComponent
          label="Single Select"
          icon={<DynamicFeedIcon fontSize="large" />}
        />
      ),
    },
    {
      id: tasksLength + 1,
      type: "TextMessage",
      title: <TextMessage />,
      thumb: (
        <ChipComponent
          label="Text Message"
          icon={<SmsIcon fontSize="large" />}
        />
      ),
    },
    {
      id: tasksLength + 1,
      type: "TextQuestion",
      title: <TextQuestion />,
      thumb: (
        <ChipComponent
          label="Text Question"
          icon={<LiveHelpIcon fontSize="large" />}
        />
      ),
    },
  ]);
  useEffect(() => {
    console.log(allItems);
  }, [allItems]);
  const resetSaved = () =>
    setSaved({
      id: "",
      type: "null",
      item: "",
      saved: false,
    });
  const handleItemClick = (index) => {
    console.log("Clicked,", index);

    var currentItem = dataSet[index];
    const currentItemProp = {
      maximized: true,
      index: index,
    };
    console.log("prop", currentItemProp);
    console.log("Clicckedd!!! ", currentItem);
    setSaved({
      id: currentItem.title.props.index,
      type: currentItem.type,
      item: convertToComponent(currentItem.title, currentItemProp),
      saved: true,
    });
  };
  const getTaskPos = (id) => dataSet.findIndex((task) => task.id === id);

  const handleDragEnd = (e) => {
    console.log("active", e.active);
    console.log("over", e.over);
    const { active, over } = e;
    if (active.id === null || over.id === null) {
      return;
    }
    if (active.id === over.id) return;
    setData((data) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);
      return arrayMove(data, originalPos, newPos);
    });
  };

  const handleDeleteItem = (idToRemove) => {
    console.log("removing", idToRemove);
    const dataCopy = [...dataSet];
    dataCopy.splice(idToRemove, 1);
    setData(dataCopy);
  };

  const handleGoBack = () => {
    resetSaved();
  };
  const handleResponse = (data, index) => {
    setSaved((prevSaved) => {
      return {
        ...prevSaved,
        data: data,
      };
    });
  };

  const handleAddItem = (title, type, id) => {
    console.log("title", title);
    var indexToWorkWith = dataSet.length;
    const dataProp = {
      handleResponse: handleResponse,
      index: indexToWorkWith,
      text: indexToWorkWith.toString(),
      maximized: true,
    };

    setSaved({
      id: indexToWorkWith + 1,
      index: indexToWorkWith,
      type: type,
      item: convertToComponent(title, dataProp),
      saved: true,
    });
  };
  const DrawerList = (
    <Box role="presentation">
      <List>
        {allItems.map((text, index) => (
          <div key={index}>
            <ListItem key={index} disablePadding>
              <ListItemText
                primary={text.thumb}
                onClick={() => {
                  if (!isGettingChat) {
                    handleAddItem(text.title, text.type, text.id);
                  } else {
                    resetSaved();
                  }
                }}
              />
            </ListItem>
          </div>
        ))}
      </List>
      <Divider />
    </Box>
  );
  const finalSubmit = (e) => {
    e.preventDefault();
    console.log("here");
    finalSubmitArr = [];
    finalSubmitArr.push({
      chatName: chatname,
      userId: authUserId,
    });
    dataSet.map((currentItem) => {
      finalSubmitArr.push(currentItem.title.props.data);
    });
    console.log(finalSubmitArr);
    setLoginMsgBox(true);
    setResponseMsg({
      responseMsg: "",
      type: "",
      icon: "",
    });
    saveChatApi({ postData: finalSubmitArr, url: "createchat" }).then((res) => {
      if (res.data.type) {
        setTimeout(() => {
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
  };
  useEffect(() => {
    var startIndex = 0;

    getThisChatData({
      postData: { userId: authUserId, chatName: chatname },
      url: "getchatbyname",
    }).then((res) => {
      setData([]);
      const mappingList = res.data.data;
      console.log("mappingList", mappingList);
      res.data.data.map((value) => {
        startIndex++;

        const resultArr = {
          type: value.type,
          index: startIndex,
          mainLabel: value.mainlabel,
          mainQuestion: value.mainquestion,
          endChat: value.endchat||value.endchatsingle,
          endChatSingle: value.endchatsingle || value.endchat
        };
        if (value.options && value.options !== "false") {
          resultArr.options = value.options.map(
            ({ id, option, response, button }) => ({
              id,
              option,
              response,
              button,
            })
          );
        }
        const dataProps = {
          handleResponse: handleResponse,
          index: startIndex,
          text: (startIndex + 1).toString(),
          data: resultArr,
          maximized: false,
        };
        setData((prevData) => [
          ...prevData,
          {
            id: resultArr.index,
            type: resultArr.type,
            title: convertToComponent(resultArr.type, dataProps),
          },
        ]);
      });
    });
  }, []);

  return (
    <>
      {isGettingChat && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          mb: "20px",
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            bgcolor: "background.paper",
            boxShadow: 3,
            flexGrow: 1,
          }}
        >
          <Alert severity="warning" sx={{ mb: 2, mt: 4 }}>
            Please makesure you save the chat after making any changes!
          </Alert>
          <Box
            component="form"
            noValidate
            onSubmit={finalSubmit}
            sx={{ filter: !isGettingChat ? "none" : "blur(2px)" }}
          >
            {dataSet.length > 0 ? (
              <>
                <DndContext
                  collisionDetection={closestCorners}
                  onDragEnd={handleDragEnd}
                  modifiers={[restrictToVerticalAxis]}
                >
                  <FirstWrapper
                    tasks={dataSet}
                    onDelete={handleDeleteItem}
                    onClick={handleItemClick}
                  />
                </DndContext>{" "}
              </>
            ) : (
              <Typography variant="h5" color="primary" sx={{ pb: 50 }}>
                Lets start by adding items from the left side of the screen
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              sx={{ mt: 3, mb: 3 }}
            >
              Save
            </Button>
          </Box>
        </Container>
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              mt: 8,
              maxWidth: "350px",
              boxSizing: "border-box",
              overflowY: "auto",
            },
          }}
        >
          {saved.saved ? (
            <>
              <IconButton onClick={handleGoBack} sx={{ mt: 1 }}>
                <ArrowBackIcon />
              </IconButton>
              {saved.item}
            </>
          ) : (
            <>{DrawerList}</>
          )}
        </Drawer>
        <Modal
          open={loginMsgBox}
          onClose={handleMsgBoxClose}
          aria-labelledby="message-modal-title"
          aria-describedby="message-modal-description"
        >
          <>
            <ModalMessage
              isPending={isSavingItems}
              responseMsg={responseMsg}
            ></ModalMessage>
          </>
        </Modal>
      </Container>
    </>
  );
};

export default DragNDrop;
