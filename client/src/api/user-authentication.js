import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL =
  process.env.REACT_APP_STAGE === "DEVELOPMENT"
    ? process.env.REACT_APP_API_URL_DEP
    : process.env.REACT_APP_API_URL_DEV;
const STAGE = process.env.REACT_APP_STAGE;
console.log(API_URL);
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
console.log(STAGE);

export const useGet = (url) => {
  const { isPending, data, isLoading  } = useQuery({
    queryKey: ["useTestData"],
    queryFn: async () => {
      try {
        if (STAGE === "PRODUCTION") {
          await wait(1000);
        } 
        const response = await axios.get(`${API_URL}/${url}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
  return { data, isLoading, isPending };
};

export const usePost = () => {
  const { isPending, mutateAsync, isSuccess } = useMutation({
    mutationFn: async ({ postData, url }) => {
      try {
        if (STAGE === "PRODUCTION") {
          await wait(1000);
        } 
        const res = await axios.post(`${API_URL}/${url}`, postData);

        return res;
      } catch (error) {
        return error.response;
      }
    },
  });
  return { isPending, mutateAsync, isSuccess };
};
