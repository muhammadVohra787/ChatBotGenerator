import React from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TextQuestion from "../TypesOfInput/TextQuestion";
import TextMessage from "../TypesOfInput/TextMesage";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { IconButton, Box, Button } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
const SecondWrapper = ({ id, title, onDelete, onClick }) => {
  const { attributes, listeners, setNodeRef, transform, transition, index } =
    useSortable({ id });
  const componentMap = {
    TextMessage: TextMessage,
    TextQuestion: TextQuestion,
  };

  const setOnFocus = (index) => {
    console.log(index);
  };

  const handleDelete = (id) => {
    console.log(id);
    onDelete(id);
  };

  const convertToComponent = (title, props) => {
    if (typeof title === "object") {
      const mergedProps = { ...title.props, ...props };
      return { ...title, props: mergedProps };
    }
    const Component = componentMap[title];

    if (!Component) {
      throw new Error(`Component not found: ${title}`);
    }
    return <Component {...props} />;
  };
  const handleClick = (index) => {
    onClick(index);
  };
  return (
    <Box
      sx={{
        display: "flex",
        p: 0,
        m: 0,
        mb: 2,
        bgcolor: "background.paper",
        borderBottom: "1px solid gray",
      }}
    >
      <Box
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        sx={{
          transition,
          transform: CSS.Transform.toString(transform),
          cursor: "grab",
        }}
      >
        <IconButton
          sx={{
            mt: 2,
            p: 0,
            pl: 1,
            pr: 1,
            cursor: "grab",
          }}
        >
          <DragIndicatorIcon />
        </IconButton>
      </Box>
      <Box>
        <IconButton
          sx={{
            mt: 2,
            p: 0,
            pr: 1,
            pl: 1,
            transition,
            transform: CSS.Transform.toString(transform),
          }}
          onClick={() => {
            handleDelete(index);
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          transition,
          transform: CSS.Transform.toString(transform),
          flexGrow: "2",
        }}
        onClick={() => {
          console.log("clicked from second", index);
          handleClick(index);
        }}
      >
        {convertToComponent(title, {
          text: index + 1,
          index: index,
          tabIndex: index,
          setOnFocus: setOnFocus,
        })}
      </Box>
      
    </Box>
  );
};

export default SecondWrapper;
