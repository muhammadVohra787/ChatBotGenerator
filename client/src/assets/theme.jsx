import React from 'react';
import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#080a45",
    },
    secondary: {
      main: "#f1ddd9",
    },
  },
  typography: {
    fontFamily: "Urbanist",
    fontWeightRegular: 400,
    fontWeightBold: 900,
    fontWeightLight: 300,
    fontWeightMedium: 600,
    pFF: ["Inter"],
    sFF: ["Bricolage Grotesque"],
    success: "green",
    error: "red",
    fili: "purple",
  },
  zIndex: { appBar: 1200, drawer: 1100 }
});
