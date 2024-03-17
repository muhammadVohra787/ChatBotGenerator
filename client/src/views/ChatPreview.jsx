import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ChatBot from "react-simple-chatbot";
// import basicSteps from "../constants/basicSteps";
import { useNavigate } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { usePost } from "../api/user-authentication";
import TextMessage from "../components/TypesOfInput/TextMesage";
export const ChatPreview = () => {
  const auth = useAuthUser();
  const authUserId = auth && auth.user_id;
  const navigate = useNavigate();
  const { chatname } = useParams();
  const [arr, setArr] = useState(null);
  const [currentIndex, setCurrIndex] = useState(0);
  const {
    isPending: isFetchingChatData,
    mutateAsync: getThisChatData,
  } = usePost();
  const [dataSet, setData] = useState([]);
  let basicSteps = [
    {
      id: "1",
      message: "Hello my friend, please tell me your name?",
      trigger: "2",
    },
    {
      id: "2",
      user: true,
      trigger: "3",
    },
    {
      id: "3",
      message: "Which season do you like the most?",
      trigger: "4",
    },
    {
      id: "4",
      component: <TextMessage />,
      waitAction: true,
      trigger: "5",
    },
    {
      id: "5",
      message: "That's Good!!",
      end: true,
    },
  ];
  useEffect(() => {
    var startIndex = -1;

    getThisChatData({
      postData: { userId: authUserId, chatName: chatname, index: currentIndex },
      url: "getitembyindex",
    }).then((res) => {
      console.log(res.data.data.rows);
      setArr(res.data.data.rows);
    });
  }, []);
  return <ChatBot
  steps={[
    {
      id: '1',
      message: 'What is your name?',
      trigger: '2',
    },
    {
      id: '2',
      user: true,
      trigger: '3',
    },
    {
      id: '3',
      message: 'Hi {previousValue}, nice to meet you!',
      end: true,
    },
  ]}
/>;
};
