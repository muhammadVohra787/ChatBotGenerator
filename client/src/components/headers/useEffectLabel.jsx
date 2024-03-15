import { useEffect } from "react";

const useTitleAreaEffect = (
  data,
  index,
  setTitleArea,
  numOfBoxes,
  setNumOfBoxes
) => {
  useEffect(() => {
    if (data) {
      setTitleArea((prevTitleArea) => ({
        ...prevTitleArea,
        index: data.index !== undefined ? data.index : index,
        fullLabel:
          data.mainLabel !== undefined
            ? data.mainLabel
            : prevTitleArea.fullLabel,
        fullQuestion:
          data.mainQuestion !== undefined
            ? data.mainQuestion
            : prevTitleArea.fullQuestion,
        endChat:
          data.endChat !== undefined ? data.endChat : prevTitleArea.endChat,
        endChatSingle:
          data.endChatSingle !== undefined
            ? data.endChatSingle
            : prevTitleArea.endChatSingle,
        options:
          data.options !== undefined ? data.options : prevTitleArea.options,
        type: "TextMessage",
      }));
      if (data.options) {
        setNumOfBoxes((prevNumOfBoxes) => [
          ...prevNumOfBoxes,
          ...data.options.map((entry) => ({
            id: entry.id,
            option: entry.option,
            response: entry.response,
            button: entry.button,
          })),
        ]);
      }
    }
  }, [data, index, setTitleArea, setNumOfBoxes]);
};

export default useTitleAreaEffect;
