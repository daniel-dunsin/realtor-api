import { ForbiddenError, NotFoundError } from "../handlers/responseHandlers";
import { IWallet } from "../interfaces/schema/wallet.schema";
import Wallet from "../models/wallet.model";

const createWallet = async (agent: string) => {
  const walletInDb = await Wallet.findOne({ agent });

  if (walletInDb) {
    throw new ForbiddenError("Wallet already exist");
  }

  await Wallet.create({ agent });
};

const getWallet = async (agent: string): Promise<IWallet> => {
  const wallet = await Wallet.findOne({ agent });

  if (!wallet) {
    throw new NotFoundError("Agent Wallet does not exist");
  }

  return wallet;
};

const walletService = {
  createWallet,
  getWallet,
};

export default walletService;
