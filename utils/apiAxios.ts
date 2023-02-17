import axios from "axios";
const API_URL = process.env.API_URL as string;

const apiAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true, // This helps with cors issues when using cookies and headers to server
});

export default apiAxios;
