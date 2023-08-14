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
  property: string;
  bidding: string;
}
