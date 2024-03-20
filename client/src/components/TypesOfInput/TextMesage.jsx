import React, { useState } from "react";
import MinimizeClose from "../MinimizeClose";
import useValidation from "../../api/select-validation";
import {
  Box,
  TextField,
  Button,
  Divider,
  Container,
  Tooltip,
  IconButton,
  Typography,
} from "@mui/material";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import useHeaders from "../headers/internal-label";
import useTitleAreaEffect from "../headers/useEffectLabel";
const TextMessage = ({ text, handleResponse, index, data, maximized }) => {

  const { validate, errors: validationErrors } = useValidation();
  const [minimize, setMinimize] = useState(false);
  const { boxTitleArea, setTitleArea } = useHeaders();
  useTitleAreaEffect(data, index, setTitleArea);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTitleArea((prevTitleArea) => ({
      ...prevTitleArea,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const labelValidation = validate("fullLabel", boxTitleArea.fullLabel);
    const questionValidation = validate(
      "fullQuestion",
      boxTitleArea.fullQuestion
    );
    if (labelValidation && questionValidation) {
      const dataIndex = data && data.index !== undefined ? data.index : index;
      const resultArr = {
        type: "TextMessage",
        index: dataIndex,
        mainLabel: boxTitleArea.fullLabel,
        mainQuestion: boxTitleArea.fullQuestion,
      };
      setTitleArea(resultArr);
      handleResponse(resultArr, index);
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        bgcolor: "background.paper",
        boxShadow: "-1px 0px 1px 0px #aaa",
        p: 1,
      }}
    >
      <MinimizeClose
        text={index+1 + ": Text Message- " + boxTitleArea.fullLabel}
        maximized={maximized}
      />
      <br />

      {maximized ? (
        <>
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
              label="Message Text"
              onChange={handleChange}
              value={boxTitleArea.fullQuestion}
              name={"fullQuestion"}
              fullWidth
              required
              error={!!validationErrors.fullQuestion}
              helperText={validationErrors.fullQuestion}
            />
            <br />
            <Divider
              sx={{ mt: 2, mb: 2, color: "black" }}
              variant="fullWidth"
            />

            <Button variant="contained" color="primary" fullWidth type="submit">
              Save
            </Button>
          </Box>
        </>
      ) : (
        <>
          {data && (
            <Box>
              <Typography variant="body1">{data.mainQuestion}</Typography>
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default TextMessage;
