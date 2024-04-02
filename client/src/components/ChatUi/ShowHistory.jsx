import React from "react";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  avatarSpacer,
  ConversationHeader,
  EllipsisButton,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import Container from "@mui/material/Container";
import '../../styles/chatStyles.css'
const ShowHistory = ({ showArr }) => {
  return (
    <>
      <Container maxWidth="xs">
        <ConversationHeader>
          <ConversationHeader.Back />
          <Avatar
            name="Zoe"
            src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
          />
          <ConversationHeader.Content
            info="Active 10 mins ago"
            userName="Zoe"
          />
          <ConversationHeader.Actions>
            <EllipsisButton orientation="vertical" />
          </ConversationHeader.Actions>
        </ConversationHeader>

        <MessageList
          style={{
            height: "50%",
            width: "100%",
          }}
        >
          {showArr.map((value, index) =>
            value.map((value1, index1) => (
              <Message
                avatarSpacer
                key={value}
                model={{
                  message: value1.message,
                  sentTime: "just now",
                  sender: "ChatBot",
                  direction: !value1.value ? "incoming" : "outgoing",
                }}
              />
            ))
          )}
        </MessageList>
      </Container>
    </>
  );
};

export default ShowHistory;
