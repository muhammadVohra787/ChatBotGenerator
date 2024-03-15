import React from "react";
import {Typography, Container } from "@mui/material";

const MinimizeClose = ({ text }) => {
  const presetDataIndex = text.split();
  const updatedText =
    presetDataIndex !== -1 ? text.replace("undefined", "predefined") : text;

  return (
    <Container sx={{ display: "flex", pt: 1 }} maxWidth="xs">
      <Typography
        variant="body1"
        color="initial"
        sx={{ pt: 0.4 }}
        maxWidth={"xs"}
      >
        {updatedText}
      </Typography>
    </Container>
  );
};

export default MinimizeClose;
