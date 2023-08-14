import axios from "axios";
import { settings } from "../constants/settings";

const http = axios.create({
  baseURL: "https://api.paystack.co",
  headers: {
    Authorization: `Bearer ${settings.paystack.test}`,
  },
});

export default http;
