import React from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
const ChatMessage = ({ data }) => {
  console.log(data.index);
  return (
    <Message
      model={{
        message: data.mainQuestion,
        sentTime: "just now",
        sender: "ChatBot",
      }}
    />
  );
};

export default ChatMessage;
