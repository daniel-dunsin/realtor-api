export interface IInitiatePaymentRes {
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface IWebhookData {
  reference: string;
  status: string;
  created_at: string;
  amount: number;
  currency: "NGN";
  id: number;
}
