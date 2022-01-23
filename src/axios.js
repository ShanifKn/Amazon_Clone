import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5001/fir-8d970/us-central1/api",
});

export default instance;
