import { ITransactionStatus, ITransactionType } from "../constant";

export interface IInitializeTransactionBody {
  email: string;
  amount: number;
}

export interface ICreateTransactionBody {
  reference: string;
  status?: ITransactionStatus;
  description: string;
  amount: number;
  type: ITransactionType;
  payment_gateway: "card" | "wallet";
  property?: string;
  bidding?: string;
  initiator: string;
}

export interface ICreateTransferRecepientBody {
  name: string;
  account_number: string;
  bank_code: string;
}

export interface IInitiateWithdrawalBody extends ICreateTransferRecepientBody {
  amount: number;
  user: string;
}
