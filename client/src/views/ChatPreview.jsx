import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ChatBot from "react-simple-chatbot";
import { useNavigate } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { usePost } from "../api/user-authentication";
import { CircularProgress, Box } from "@mui/material";
export const ChatPreview = ({ chatnameFromParent,userIdFromParent }) => {
  const [steps, setSteps] = useState([]);
  const auth = useAuthUser();
  const authUserId = auth && auth.user_id;
  const { chatname } = useParams();
  const [dataReceived, setDataStatus] = useState(false);
  const {
    isPending: isFetchingChatData,
    mutateAsync: getThisChatData,
  } = usePost();

  useEffect(() => {
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
        setDataStatus(true);
      }
    });
  }, []);
  useEffect(() => {}, [steps]);
  return (
    <>
      {isFetchingChatData && (
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
          filter: isFetchingChatData ? "blur(8px)" : "none",
          alignItems: "center",
        }}
      >
        {steps.length > 0 && <ChatBot steps={steps} />}
      </Box>
    </>
  );
};
