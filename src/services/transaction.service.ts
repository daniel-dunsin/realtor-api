import { BadRequestError, NotFoundError } from "../handlers/responseHandlers";
import { ITransactionStatus } from "../interfaces/constant";
import { ITransaction } from "../interfaces/schema/wallet.schema";
import { ICreateTransactionBody } from "../interfaces/services/wallet.body";
import Transaction from "../models/transaction.model";

const createTransaction = async (
  body: ICreateTransactionBody
): Promise<ITransaction> => {
  const transaction = await Transaction.create({
    reference: body.reference,
    status: body.status || "pending",
    currency: "NGN",
    description: body.description,
    amount: body.amount,
    type: body.type,
    payment_gateway: body.payment_gateway,
    property: body.property,
    bidding: body.bidding,
  });

  return transaction;
};

const updateTransactionStatus = async (
  id: string,
  success: boolean
): Promise<ITransaction> => {
  const transaction = await Transaction.findById(id);

  if (!transaction) {
    throw new NotFoundError("Transaction does not exist");
  }

  if (transaction.status !== "pending") {
    throw new BadRequestError("Transaction is not pending");
  }

  transaction.status = status ? "success" : "failed";

  const result = await transaction.save();

  return result;
};

const deleteTransaction = async (_id: string) => {
  const transaction = await Transaction.findByIdAndDelete(_id);

  if (!transaction) {
    throw new NotFoundError("Transaction does not exist");
  }
};

const findById = async (_id: string): Promise<ITransaction> => {
  const transaction = await Transaction.findById(_id);

  if (!transaction) {
    throw new NotFoundError("Transaction does not exist");
  }

  return transaction;
};

const transactionService = {
  findById,
  createTransaction,
  updateTransactionStatus,
  deleteTransaction,
};

export default transactionService;
