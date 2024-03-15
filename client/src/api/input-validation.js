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
      if (field === "email") {
        const emailPattern =
          /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

        const isValid = emailPattern.test(value);
        updateErrors("email", isValid ? undefined : "Invalid email address.");
        return isValid;
      }

      if (field === "name") {
        const isValid = value.length >= 5;
        updateErrors(
          "name",
          isValid ? undefined : "Name must be atleast 3 letters"
        );
        return isValid;
      }

      if (field === "password") {
        const isValid = value.length >= 6;
        updateErrors(
          "password",
          isValid ? undefined : "Password must have at least 8 characters"
        );
        return isValid;
      }

      if (field === "newPassword") {
        const isValid = value.length >= 6;
        updateErrors(
          "newPassword",
          isValid ? undefined : "Password must have at least 8 characters"
        );
        return isValid;
      }
      if (field === "newPasswordR") {
        const isValid = value === newValue;
        updateErrors(
          "newPasswordR",
          isValid ? undefined : "Passwords Dont Match"
        );
        return isValid;
      }
      if (field === "verificationCode") {
        const isValid = value.length === 7;
        updateErrors(
          "verificationCode",
          isValid ? undefined : "Verification Code is 7 digits"
        );
        return isValid;
      }
      if (field === "fullLabel") {
        const isValid = value.length >= 5;
        updateErrors(
          "fullLabel",
          isValid ? undefined : "Label needs to be longer than 5 letters/digits"
        );
        return isValid;
      }
      if (field === "fullQuestion") {
        const isValid = value.length >= 5;
        updateErrors(
          "fullQuestion",
          isValid
            ? undefined
            : "Question needs to be longer than 5 letters/digits"
        );
        return isValid;
      }
      if (field === "option") {
        const isValid = value.length >= 5;
        updateErrors(
          "option",
          isValid
            ? undefined
            : "option needs to be longer than 5 letters/digits, remove extra options"
        );
        return isValid;
      }

      return { isValid: true, errorMessage: "" };
    },
  };
}
