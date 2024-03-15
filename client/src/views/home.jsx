import React from "react";
import Container from "@mui/material/Container";
import SignIn from "./SignInPage";
const Home = (props) => {
  return (
    <>
      <Container maxWidth="md"></Container>
      <SignIn showError={false} />
    </>
  );
};

export default Home;
