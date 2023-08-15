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

export interface IBank {
  name: string;
  slug: string;
  code: string;
  active: boolean;
  country: "Nigeria";
  currency: "NGN";
  type: "nuban";
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFetchBanksRes {
  status: boolean;
  message: string;
  data: Array<IBank>;
}

export interface IVerifyAccountRes {
  status: boolean;
  message: string;
  data: {
    account_number: string;
    account_name: string;
    bank_id: number;
  };
}

export interface ICreateRecipientRes {
  status: boolean;
  message: string;
  data: {
    active: boolean;
    createdAt: Date;
    currency: "NGN";
    id: number;
    name: string;
    recipient_code: string;
    type: "nuban";
    details: {
      authorization_code: string;
      account_number: string;
      account_name: string;
      bank_code: string;
      bank_name: string;
    };
  };
}

export interface IWithdrawRes {
  status: boolean;
  message: string;
  data: {
    reference: string;
    currency: "NGN";
    amount: number;
    recipient: string;
  };
}
