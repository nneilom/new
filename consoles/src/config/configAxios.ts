import axios from "axios";
import { baseAPI } from "../Shared/store/api/baseURL";

const confAxios = () => {
  const tokensString = localStorage.getItem("responseData");
  const tokens = tokensString ? JSON.parse(tokensString) : null;
  const Authorization: string | null = tokens
    ? `Bearer ${tokens.access}`
    : null;
  const configuratedAxios = axios.create({
    baseURL: baseAPI,
    headers: { Authorization },
  });
  // console.log("tokens", tokens);

  return configuratedAxios;
};

export default confAxios();
