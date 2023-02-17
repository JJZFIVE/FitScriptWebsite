import axios from "axios";
const API_URL = process.env.API_URL as string;

const apiAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default apiAxios;
