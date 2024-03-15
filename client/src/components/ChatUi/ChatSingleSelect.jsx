import React, { useState } from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import { Button, Container, Box } from "@mui/material";

export const ChatSingleSelect = ({ data ,onResponseReceived}) => {
  const [showResponse, hideResponse] = useState(false);
  const [response, setResponse] = useState(null);
  const setReponseFunction = (choosenOption) => {
    setResponse(choosenOption.response);
    hideResponse(true);
    onResponseReceived()
  };
  return (
    <div>
      <Message
        model={{
          message: data.mainQuestion,
          sentTime: "just now",
          sender: "ChatBot",
        }}
      />
      <br />
      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        {showResponse
          ? ""
          : data.options.map((option) => (
              <Button
                variant="contained"
                color="primary"
                key={option.id}
                onClick={() => {
                  setReponseFunction(option);
                }}
              >
                {option.option}
              </Button>
            ))}
      </Box>
      <br />
      {showResponse && (
        <Message
          model={{
            message: response,
            direction: "incoming",
            sentTime: "just now",
            sender: "ChatBot",
            position: "single",
          }}
        />
      )}
    </div>
  );
};
