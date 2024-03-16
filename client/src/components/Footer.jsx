import React from "react";
import { Typography, Box, AppBar, Toolbar } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useTheme } from "@mui/material/styles";

const Footer = () => {
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      color="default"
      sx={{
        mt: 3,
        top: "auto",
        bottom: 0,
        boxShadow: `0px 0px 10px gray`,

        width: "100%",
      }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="body1" color="primary">
            © 2023 MV Auth, All Rights Reserved.
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: "16px" }}>
          <TwitterIcon sx={{ color: theme.palette.primary.main }} />
          <InstagramIcon sx={{ color: theme.palette.primary.main }} />
          <FacebookIcon sx={{ color: theme.palette.primary.main }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
