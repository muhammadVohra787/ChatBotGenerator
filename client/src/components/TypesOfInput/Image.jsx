import React, { useState } from "react";
import MinimizeClose from "../MinimizeClose";
import {
  Box,
  TextField,
  Button,
  Divider,
  Container,
  Tooltip,
  IconButton,
} from "@mui/material";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import useValidation from "../../api/select-validation";
import useHeaders from "../headers/internal-label";
const Image = (text) => {
  var resultArr = [];
  const [minimize, setMinimize] = useState(false);
  const { validate, errors: validationErrors } = useValidation();
  const [imageFile, setImageFile] = useState(null);
  const { boxTitleArea, setTitleArea } = useHeaders();

  const resetForm = () => {
    setTitleArea({
      fullLabel: "",
    });
    setImageFile(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "imageFile") {
      setImageFile(value);
    }
    setTitleArea((prevTitleArea) => ({
      ...prevTitleArea,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const labelValidation = validate("fullLabel", boxTitleArea.fullLabel);
    if (labelValidation && imageFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const uploadedImage = event.target.result;
        resultArr = {
          mainLabel: boxTitleArea.fullLabel,
          imageFile: uploadedImage,
        };
        console.log(resultArr);

        localStorage.setItem("uploadedImage", uploadedImage);
      };
      reader.readAsDataURL(imageFile);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        bgcolor: "background.paper",
        boxShadow: "-1px 0px 1px 0px #aaa",
        p: 1,
      }}
    >
      <MinimizeClose
        text={text.text + ": Text Question"}
        minimize={minimize}
        setMinimize={setMinimize}
      />
      <br />
      {minimize && (
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 1, alignItems: "center", alignContent: "center" }}
        >
          <TextField
            label={"Internal label"}
            onChange={handleChange}
            value={boxTitleArea.fullLabel}
            name={"fullLabel"}
            fullWidth
            required
            error={!!validationErrors.fullLabel}
            helperText={validationErrors.fullLabel}
          />
          <Tooltip title="Internal Label must be unique for future reference">
            <IconButton>
              <TipsAndUpdatesIcon />
            </IconButton>
          </Tooltip>
          <br />
          <br />
          <TextField
            type="file"
            fullWidth
            label={"Add an image"}
            onChange={handleChange}
            name="imageFile"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              accept: "image/*",
            }}
          />
          <br />
          <br />
          <Divider sx={{ mt: 2, mb: 2, color: "black" }} variant="fullWidth" />
          <Box sx={{ display: "flex", gap: "8px" }}>
            <Button variant="contained" color="primary" fullWidth type="submit">
              Save
            </Button>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={resetForm}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Image;
