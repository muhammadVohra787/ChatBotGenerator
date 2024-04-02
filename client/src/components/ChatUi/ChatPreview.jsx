import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ChatBot from "react-simple-chatbot";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { usePost } from "../../api/user-authentication";
import { CircularProgress, Box } from "@mui/material";


export const ChatPreview = ({
  chatnameFromParent,
  userIdFromParent,
  preview,
}) => {
  const [steps, setSteps] = useState([]);
  const auth = useAuthUser();
  const authUserId = auth && auth.user_id;
  const { chatname } = useParams();
  const {
    isPending: isFetchingChatData,
    mutateAsync: getThisChatData,
  } = usePost();
  const {
    isPending: isSavingChatData,
    mutateAsync: saveThisChatData,
  } = usePost();
  useEffect(() => {
    setSteps([]);
    getThisChatData({
      postData: {
        userId: authUserId || userIdFromParent,
        chatName: chatname || chatnameFromParent,
      },
      url: "getitembyindex",
    }).then((res) => {
      console.log(res.data);
      if (res.data.type) {
        setSteps((prevData) => [...prevData, ...res.data.data]);
        console.log("RESSS", res.data);
      }
    });
  }, [chatnameFromParent, userIdFromParent]);
  const handleEnd = (chatHistory) => {
    console.log(chatHistory.renderedSteps);
    if (!preview) {
      const savedResponse = {
        userId: authUserId || userIdFromParent,
        chatName: chatname || chatnameFromParent,
        data: chatHistory.renderedSteps,
      };
      saveThisChatData({
        postData: savedResponse,
        url: "saveChat",
      }).then((res) => {
        console.log(res);
      });
    }
  };
  return (
    <>
      {(isFetchingChatData || isSavingChatData) && (
        <>
          {" "}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            variant="contained"
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress color="inherit" />
            </Box>
          </Box>
        </>
      )}
      <Box
        sx={{
          display: !isFetchingChatData ? "" : "none",
          alignItems: "center",
        }}
      >
        {steps.length > 0 && (
          <ChatBot
            headerTitle={chatname || chatnameFromParent}
            steps={steps}
            handleEnd={handleEnd}
            customDelay="0"
            floating={true}
            opened={true}
            style={{
              bottom: "80px",
            }}
          />
        )}
      </Box>
    </>
  );
};
