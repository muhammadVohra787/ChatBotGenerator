import React from "react";
import { Chip, IconButton } from "@mui/material";
const ChipComponent = ({ icon, label }) => {
  return (
    <IconButton>
      <Chip
        icon={icon}
        label={label}
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: 100,
          borderRadius: 0,
          p: 0,
          m: 0,
          "& .MuiChip-label": {
            pl: 0.3,
            pr: 0.3,
          },
        }}
      />
    </IconButton>
  );
};

export default ChipComponent;
