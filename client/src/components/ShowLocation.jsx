import React from "react";
import { useLocation } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const ShowLocation = () => {
  const location = useLocation();

  return (
    <Container maxWidth="lg">
      <Typography variant="h6" color="initial">
        Current Path: {location.pathname}
      </Typography>
    </Container>
  );
};

export default ShowLocation;
