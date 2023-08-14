export interface IInitiatePaymentRes {
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}
