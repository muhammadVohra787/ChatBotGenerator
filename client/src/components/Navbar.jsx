import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Box,
  Alert,
  Typography,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import SignIn from "./SignInModal";
import SignUp from "./SignUpModal";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to manage the drawer
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const signOut = useSignOut();

  const handleSignOut = () => {
    signOut();
    setShowSuccessAlert(true);
    const lastVisitedUrl = -1;
    lastVisitedUrl === -1 ? window.location.reload() : navigate(lastVisitedUrl);
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 2000);
  };

  return (
    <Box sx={{ mb: "70px" }}>
      <AppBar position="fixed" color="default">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 0.5 }}>
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              MVAuth
            </Link>
          </Typography>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              gap: "16px",
              flexGrow: 0.5,
            }}
          >
            <Link
              to="/publicroute1"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Public1
            </Link>
            <Link
              to="/secureroute1"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Secure1
            </Link>
            <Link
              to="/forgotPassword"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Forgot Pass
            </Link>
            <Link
              to="/changePass"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Change Pass
            </Link>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            {isAuthenticated() ? (
              <Button color="inherit" onClick={handleSignOut}>
                Sign Out
              </Button>
            ) : (
              <>
                <SignIn type="text" text="Login" />
                <SignUp type="text" text="Register" />
              </>
            )}
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={() => setIsDrawerOpen(true)}
            sx={{ display: { xs: "block", sm: "none" }, ml: "auto" }} // Show only on small screens and below, move to far right
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
        {showSuccessAlert && (
          <Alert
            severity="success"
            onClose={() => setShowSuccessAlert(false)}
            sx={{ backgroundColor: "#43a047" }}
          >
            You have successfully signed out.
          </Alert>
        )}
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        >
          <List>
            <ListItem
              component={Link}
              to="/publicroute1"
              onClick={() => setIsDrawerOpen(false)}
            >
              <ListItemText primary="Public1" />
            </ListItem>
            <ListItem
              component={Link}
              to="/publicroute2"
              onClick={() => setIsDrawerOpen(false)}
            >
              <ListItemText primary="Public2" />
            </ListItem>
            <ListItem
              component={Link}
              to="/secureroute1"
              onClick={() => setIsDrawerOpen(false)}
            >
              <ListItemText primary="Secure1" />
            </ListItem>
            <ListItem
              component={Link}
              to="/secureroute2"
              onClick={() => setIsDrawerOpen(false)}
            >
              <ListItemText primary="Secure2" />
            </ListItem>
            <ListItem
              component={Link}
              to="/changePass"
              onClick={() => setIsDrawerOpen(false)}
            >
              <ListItemText primary="Change Pass" />
            </ListItem>
            <ListItem onClick={isAuthenticated() ? handleSignOut : undefined}>
              <ListItemText
                primary={isAuthenticated() ? "Sign Out" : "Sign In"}
              />
            </ListItem>
            {!isAuthenticated() && (
              <ListItem>
                <SignIn type="text" text="Login" />
              </ListItem>
            )}
            {!isAuthenticated() && (
              <ListItem>
                <SignUp type="text" text="Register" />
              </ListItem>
            )}
          </List>
        </Drawer>
      </AppBar>
    </Box>
  );
};

export default Navbar;
