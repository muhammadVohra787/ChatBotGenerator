import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Divider,
  IconButton,
  Container,
  Tooltip,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import MinimizeClose from "../MinimizeClose";
import useValidation from "../../api/select-validation";
import useHeaders from "../headers/internal-label";
import useTitleAreaEffect from "../headers/useEffectLabel";

const SingleSelect = ({ text, handleResponse, index, data, maximized }) => {
  const { validate, errors: validationErrors } = useValidation();
  const { boxTitleArea, setTitleArea } = useHeaders();
  const [resultArr, setResultArr] = useState([]);
  const [minimize, setMinimize] = useState(false);
  const [options, setOptions] = useState([
    { id: 0, option: "", response: "ready", button: true },
    { id: 1, option: "", response: "ready", button: true },
  ]);

  useEffect(() => {
    if (data) {
      if (data.options) {
        setOptions([]);
      }
    }
  }, [data]);
  useTitleAreaEffect(data, index, setTitleArea, options, setOptions);

  const resetForm = () => {
    setTitleArea({
      fullLabel: "",
      fullQuestion: "",
      endChat: "",
    });
    setOptions([
      { id: 0, option: "", response: "ready", button: true },
      { id: 1, option: "", response: "ready", button: true },
    ]);
  };

  const setTestOptions = () => {
    setTitleArea({
      fullLabel: "Label for Contact",
      fullQuestion: "Would what service would like to know about?",
      endChat: "",
    });
    setOptions([
      {
        id: 0,
        option: "Phone Service",
        response:
          "Welcome! Our phone service offers reliable connectivity and crystal-clear voice quality. Stay connected with your loved ones without any interruptions. Explore our affordable plans tailored to your communication needs.",
        button: false,
      },
      {
        id: 1,
        option: "TV & WiFi Services",
        response:
          "Hello! Experience the ultimate entertainment and connectivity with our TV and internet services. Stream your favorite shows in high definition and enjoy lightning-fast internet speeds for seamless browsing. Discover our packages for an unparalleled entertainment experience.",
        button: false,
      },
    ]);
  };

  const handleRemoveBox = (id) => {
    setOptions(options.filter((box) => box.id !== id));
  };

  const handleAddResponse = (id) => {
    setOptions((prevOptions) =>
      prevOptions.map((box) =>
        box.id === id ? { ...box, response: "", button: false } : box
      )
    );
  };

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    if (name === "fullLabel" || name === "fullQuestion" || name === "endChat") {
      setTitleArea((prevTitleArea) => ({
        ...prevTitleArea,
        [name]: value,
      }));
    } else {
      setOptions((prevOptions) =>
        prevOptions.map((box) =>
          box.id === id ? { ...box, [name]: value } : box
        )
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const labelValidation = validate("fullLabel", boxTitleArea.fullLabel);
    const questionValidation = validate(
      "fullQuestion",
      boxTitleArea.fullQuestion
    );
    const endChatValidation = validate(
      "endChat",
      boxTitleArea.endChat,
      options
    );

    console.log("validation", endChatValidation);
    const optionValidations = validate("option", options);
    console.log(
      endChatValidation,
      optionValidations,
      questionValidation,
      labelValidation
    );
    if (
      endChatValidation &&
      optionValidations &&
      questionValidation &&
      labelValidation
    ) {
      const resultArr = {
        type: "SingleSelect",
        index: index,
        mainLabel: boxTitleArea.fullLabel,
        mainQuestion: boxTitleArea.fullQuestion,
        options: options.map(({ id, option, response, button }) => ({
          id,
          option,
          response,
          button,
        })),
      };

      setResultArr(resultArr);
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
        text={text + ": Single Select- " + boxTitleArea.fullLabel}
        maximized={maximized}
      />
      <br />
      {maximized ? (
        <Box
          component="form"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
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
            label="Question Text"
            onChange={handleChange}
            value={boxTitleArea.fullQuestion}
            name={"fullQuestion"}
            fullWidth
            required
            error={!!validationErrors.fullQuestion}
            helperText={validationErrors.fullQuestion}
          />
          <br />

          <Divider sx={{ mt: 2, mb: 2, color: "black" }} variant="fullWidth" />
          {options.map((box) => (
            <Box
              key={box.id}
              sx={{
                mb: 1,
                bgcolor: "#e0e0e0",
                boxShadow: 2,
                borderRadius: 2,
                p: 2,
              }}
            >
              <IconButton
                onClick={() => handleRemoveBox(box.id)}
                sx={{
                  color: "red",
                  p: 0,
                  mr: 1,
                }}
              >
                <CloseIcon />
              </IconButton>
              <TextField
                key={box.id}
                label="Type answer option here"
                onChange={(e) => handleChange(e, box.id)}
                value={box.option}
                name="option"
                required
                error={!!validationErrors.option}
                helperText={validationErrors.option}
              />

              <Box sx={{ ml: 4, mt: 2 }}>
                {box.response !== "ready" && (
                  <TextField
                    label={"Chat bot response for this selection"}
                    onChange={(e) => handleChange(e, box.id)}
                    value={box.response}
                    name={"response"}
                  />
                )}
                {box.button && (
                  <Button
                    sx={{ fontSize: "10px", ml: 1 }}
                    onClick={() => handleAddResponse(box.id)}
                  >
                    + Add chatbot response
                  </Button>
                )}
              </Box>
            </Box>
          ))}
          <Button
            variant="contained"
            color="primary"
            sx={{ mb: 3 }}
            fullWidth
            onClick={() =>
              setOptions((prevOptions) => [
                ...prevOptions,
                {
                  id: prevOptions.length,
                  option: "",
                  response: "ready",
                  button: true,
                },
              ])
            }
          >
            Add Option
          </Button>
          <br />
          <TextField
            label="Chat response at the end"
            onChange={handleChange}
            value={boxTitleArea.endChat}
            name={"endChat"}
            fullWidth
            required
            error={!!validationErrors.endChat}
            helperText={validationErrors.endChat}
          />
          <br />
          <br />
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
          <Button onClick={setTestOptions}>Set Test Options</Button>
        </Box>
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

export default SingleSelect;
