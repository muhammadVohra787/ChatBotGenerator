import React, { useState } from "react";
import MinimizeClose from "../components/MinimizeClose";
import useValidation from "../api/input-validation";
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
import useHeaders from "../components/headers/internal-label";
import { FocusTrap } from "@mui/base/FocusTrap";

export const ChatPage = ({ text, handleResponse, index }) => {
  var resultArr = [];
  const { validate, errors: validationErrors } = useValidation();
  const [minimize, setMinimize] = useState(false);
  const { boxTitleArea, setTitleArea } = useHeaders();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTitleArea((prevTitleArea) => ({
      ...prevTitleArea,
      [name]: value,
    }));
  };
  const setTestOptions = () => {
    setTitleArea({
      fullLabel: "Label for Welcome Message",
      fullQuestion: "Welcome, how can we help you today?",
      endChat: "",
    });
  };
  const resetForm = () => {
    setTitleArea({
      fullLabel: "",
      fullQuestion: "",
      endChat: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const labelValidation = validate("fullLabel", boxTitleArea.fullLabel);
    const questionValidation = validate(
      "fullQuestion",
      boxTitleArea.fullQuestion
    );
    if (labelValidation && questionValidation) {
      resultArr = {
        type: "TextMessage",
        index: index,
        mainLabel: boxTitleArea.fullLabel,
        mainQuestion: boxTitleArea.fullQuestion,
      };
      handleResponse(resultArr, index);
    }
  };
  const [focusNow, setFocus] = useState(true);
  const handleFocusTrap = () => {
    minimize ? setFocus(true) : setFocus(false);
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
        text={text + ": Text Message- " + boxTitleArea.fullLabel}
        minimize={minimize}
        setMinimize={setMinimize}
        handleFocusTrap={handleFocusTrap}
      />
      <br />
      {minimize && (
        <FocusTrap open={true} disableRestoreFocus disableAutoFocus>
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

            <Box sx={{ display: "flex", gap: "8px" }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
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

          <Button
            onClick={() => {
              setTestOptions();
            }}
          >
            Set Test Options
          </Button>
        </FocusTrap>
      )}
    </Container>
  );
};
