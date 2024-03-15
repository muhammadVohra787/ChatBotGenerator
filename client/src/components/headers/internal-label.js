import React, { useState } from "react";

export default function useHeaders() {
  const [boxTitleArea, setTitleArea] = useState({
    index: "",
    fullLabel: "",
    fullQuestion: "",
    endChat: "",
    endChatSingle: "",
    options: [],
  });

  return { boxTitleArea, setTitleArea };
}
