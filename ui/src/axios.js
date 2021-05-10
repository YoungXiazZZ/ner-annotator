import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5555",
  timeout: 30000,
});

export default instance;