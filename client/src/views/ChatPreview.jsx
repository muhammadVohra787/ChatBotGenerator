import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ChatBot from "react-simple-chatbot";
// import basicSteps from "../constants/basicSteps";
import { useNavigate } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { usePost } from "../api/user-authentication";
import TextMessage from "../components/TypesOfInput/TextMesage";
export const ChatPreview = () => {
  const [steps, setSteps] = useState([]);
  const auth = useAuthUser();
  const authUserId = auth && auth.user_id;
  const navigate = useNavigate();
  const { chatname } = useParams();
  const arr = [];
  const [dataReceived, setDataStatus] = useState(false);
  const {
    isPending: isFetchingChatData,
    mutateAsync: getThisChatData,
  } = usePost();
  const [dataSet, setData] = useState([]);
  let basicSteps = [
    {
      id: "Learn More",
      message: "Interested in Learning more about our services?",
      trigger: "Hello!",
    },
    {
      id: "Hello!",
      message:
        "Hello! Welcome to XYZ Company's virtual assistant. How can I assist you today?",
      trigger: "Let me get the list for you res",
    },

    {
      id: "Let me get the list for you res",
      message: "Let me get the list for you",
      trigger: false,
    },
  ];
  useEffect(() => {
    var startIndex = -1;

    getThisChatData({
      postData: { userId: authUserId, chatName: chatname },
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
  return <>{steps.length > 0 && <ChatBot steps={steps} />}</>;
};
