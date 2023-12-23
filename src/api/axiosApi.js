import axios from "axios";
import { toast } from "react-toastify";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const apiCode = process.env.NEXT_PUBLIC_API_CODE;

// controlled
const client = axios.create({
  baseURL: baseURL,
  headers: {
    "api-code": apiCode,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// controlled
export const simpleAxiosApi = ({ ...options }) => {
  // client.defaults.headers.common["x-api-key"] = apiCode;
  // client.defaults.headers.common.Accept = "application/json";
  //   client.defaults.headers.common["Content-Type"] = "application/json";
  const onSuccess = (response) => response;
  const onError = (error) => {
    console.log(error);
    let e = error;
    let msg = e.response.data.Message;

    toast.error(msg ?? "خطا  ");
    // optionaly catch errors and add additional logging here
    throw error;
  };

  return client(options).catch((e) => onError(e));;
};
