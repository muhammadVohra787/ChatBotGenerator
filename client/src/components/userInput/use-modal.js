import { useState } from "react";

export function useModal() {
  const [open, setOpen] = useState(false);
  const [loginMsgBox, setLoginMsgBox] = useState(false);
  const [responseMsg, setResponseMsg] = useState({
    messageRes: "",
    type: "",
    icon: "",
  });

  const handleToggle = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };

  const handleMsgBoxClose = () => {
    setLoginMsgBox(false);
  };

  const handleCloseAll = () => {
    setLoginMsgBox(false);
    setOpen(false);
    setResponseMsg({
      messageRes: "",
      type: "",
      icon: "",
    });
  };

  return {
    loginMsgBox,
    setLoginMsgBox,
    responseMsg,
    setResponseMsg,
    open,
    setOpen,
    handleCloseAll,
    handleMsgBoxClose,
    handleToggle
  };
}
