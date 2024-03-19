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

const TextQuestion = ({ text, handleResponse, index, data, maximized }) => {
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
      fullLabel: "User Name",
      fullQuestion: "Please Enter Your Full Name [firstname + lastname]",
      endChatSingle: "Thankyou!",
    });
  };
  const resetForm = () => {
    setTitleArea({
      fullLabel: "",
      fullQuestion: "",
      endChatSingle: "",
    });
  };
  useTitleAreaEffect(data, index, setTitleArea);
  const handleSubmit = (e) => {
    e.preventDefault();
    const labelValidation = validate("fullLabel", boxTitleArea.fullLabel);
    const questionValidation = validate(
      "fullQuestion",
      boxTitleArea.fullQuestion
    );
    const endChatValidation = validate(
      "endChatSingle",
      boxTitleArea.endChatSingle
    );

    if (labelValidation && questionValidation && endChatValidation) {
      resultArr = {
        type: "TextQuestion",
        index: index,
        mainLabel: boxTitleArea.fullLabel,
        mainQuestion: boxTitleArea.fullQuestion,
        endChatSingle: boxTitleArea.endChatSingle,
        response: "user response here",
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
        text={index + 1 + ": Text Question- " + boxTitleArea.fullLabel}
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
            <Tooltip title="Users response will be saved!">
              <IconButton>
                <TipsAndUpdatesIcon />
              </IconButton>
            </Tooltip>
            <br />
            <br />
            <TextField
              label="Chat response at the end"
              onChange={handleChange}
              value={boxTitleArea.endChatSingle}
              name={"endChatSingle"}
              fullWidth
              required
              error={!!validationErrors.endChatSingle}
              helperText={validationErrors.endChatSingle}
            />
            <br />
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

export default TextQuestion;
