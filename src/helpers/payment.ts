import http from "../config/axios.config";
import { settings } from "../constants/settings";
import { CustomError } from "../handlers/errorHandlers";

const initiatePayment = async (email: string, amount: number) => {
  try {
    const response = await http.post("/", { email, amount });
  } catch (error: any) {
    throw new CustomError(error.message, 500);
  }
};

const payment = {};

export default payment;
