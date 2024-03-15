import { useState } from "react";

export default function useValidation() {
  const [errors, setErrors] = useState({});

  const updateErrors = (field, error) => {
    setErrors((prev) => {
      return {
        ...prev,
        [field]: error,
      };
    });
  };
  return {
    get errors() {
      return errors;
    },
    validate(field, value, newValue) {
      if (field === "fullLabel") {
        const isValid = value.length >= 5;
        updateErrors(
          "fullLabel",
          isValid ? undefined : "Label needs to be longer than 5 letters/digits"
        );
        return isValid;
      }
      if (field === "fullQuestion") {
        const isValid = value.length >= 2;
        updateErrors(
          "fullQuestion",
          isValid
            ? undefined
            : "Question needs to be longer than 2 letters/digits"
        );
        return isValid;
      }
      if (field === "option") {
        console.log(value);
        var errorList = [];
        var isValid = undefined;
        value.map((values) => {
          isValid = values.option.length > 1;
          errorList.push(isValid);
        });
        if (errorList.includes(false)) {
          isValid = false;
        }
        updateErrors(
          "option",
          isValid
            ? undefined
            : "option needs to be longer than 2 letters/digits, remove extra options"
        );
        return isValid;
      }

      if (field === "endChat") {
        const responses = [];
        const options = [];
        let isValid = true;

        newValue.forEach((responseData) => {
          if (
            responseData.response !== "ready" &&
            responseData.response !== null &&
            responseData.response.trim() !== ""
          ) {
            responses.push(responseData.response);
          }
          options.push(responseData.option);
        });

        console.log("responses:", responses);

        if (
          options.length === 0 &&
          responses.length === 1 &&
          responses[0].length > 2
        ) {
          isValid = true;
        } else if (options.length > 0 && responses.length === options.length) {
          isValid = true;
        } else if (responses.length === 0 && value.length > 2) {
          isValid = true;
        } else {
          isValid = false;
        }
        updateErrors(
          "endChat",
          isValid
            ? undefined
            : "Please ensure consistency: either provide a response message for each option or no responses."
        );

        return isValid;
      }

      if (field === "endChatSingle") {
        console.log(value);
        const isValid = value.length >= 2;
        updateErrors(
          "endChatSingle",
          isValid
            ? undefined
            : "Chat response needs to be longer than 2 letters/digits, remove extra options"
        );
        return isValid;
      }
      return { isValid: true, errorMessage: "" };
    },
  };
}
