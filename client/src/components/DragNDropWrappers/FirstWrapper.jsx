import React from "react";
import { Box } from "@mui/material";
import SecondWrapper from "./SecondWrapper";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
const FirstWrapper = ({ tasks, onDelete, onClick }) => {
  const handleDelete = (id) => {
    onDelete(id);
  };
  const handleClick = (index) => {
    onClick(index);
  };

  return (
    <Box sx={{ p: 0 }}>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <SecondWrapper
            className="data-class"
            id={task.id}
            key={task.id}
            title={task.title}
            onDelete={handleDelete}
            onClick={handleClick}
          />
        ))}
      </SortableContext>
     
    </Box>
  );
};

export default FirstWrapper;
