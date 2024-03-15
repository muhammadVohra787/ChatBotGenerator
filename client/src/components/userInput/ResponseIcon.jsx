import React from 'react';
import { Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const ResponseIcon = ({ icon }) => {
  return (
    <>
      {icon ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: '2rem',
          }}
        >
          <CheckCircleOutlineIcon
            color="success"
            sx={{
              fontSize: '5.2rem',
            }}
          />
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: '2rem',
          }}
        >
          <CancelOutlinedIcon
            color="error"
            sx={{
              fontSize: '5.2rem',
            }}
          />
        </Box>
      )}
    </>
  );
};

export default ResponseIcon;
