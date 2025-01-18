import axios from "axios";
import { API_URL } from "../constants/config";

const api = axios.create({
  baseURL: API_URL,
});

export const getData = () => api.get("/test");
