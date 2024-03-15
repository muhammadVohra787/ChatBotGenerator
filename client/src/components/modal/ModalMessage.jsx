import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function ModalMessage({ isPending, responseMsg,header }) {
  
 return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 300,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        borderRadius: "20px",
      }}
      variant="contained"
    >
      {isPending ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {header}
          <CircularProgress color="inherit" />
        </Box>
      ) : (
        <>
          {responseMsg.icon}
          <Typography
            sx={{ textAlign: "center" }}
            variant="subtitle1"
            color={`${responseMsg.type}.main`}
          >
            {responseMsg.messageRes}
          </Typography>
        </>
      )}
    </Box>
 );
}
