import http from "../config/axios.config";
import { settings } from "../constants/settings";
import { CustomError } from "../handlers/errorHandlers";
import { IInitiatePaymentRes } from "../interfaces/response/payment.response";

const initiatePayment = async (
  email: string,
  amount: number
): Promise<IInitiatePaymentRes> => {
  try {
    const response = await http.post("/transaction/initialize", {
      email,
      amount: amount * 100,
    });

    return response?.data;
  } catch (error: any) {
    throw new CustomError(error.message, 500);
  }
};

const payment = {
  initiatePayment,
};

export default payment;
