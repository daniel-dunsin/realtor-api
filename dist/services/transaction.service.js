"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responseHandlers_1 = require("../handlers/responseHandlers");
const transaction_model_1 = __importDefault(require("../models/transaction.model"));
const createTransaction = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield transaction_model_1.default.create({
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
});
const updateTransactionStatus = (id, success) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield transaction_model_1.default.findById(id);
    if (!transaction) {
        throw new responseHandlers_1.NotFoundError("Transaction does not exist");
    }
    if (transaction.status !== "pending") {
        throw new responseHandlers_1.BadRequestError("Transaction is not pending");
    }
    transaction.status = success ? "success" : "failed";
    const result = yield transaction.save();
    return result;
});
const deleteTransaction = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield transaction_model_1.default.findByIdAndDelete(_id);
    if (!transaction) {
        throw new responseHandlers_1.NotFoundError("Transaction does not exist");
    }
});
const findById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield transaction_model_1.default.findById(_id);
    if (!transaction) {
        throw new responseHandlers_1.NotFoundError("Transaction does not exist");
    }
    return transaction;
});
const findByReference = (reference) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield transaction_model_1.default.findOne({ reference })
        .populate("bidding")
        .populate("property");
    if (!transaction)
        throw new responseHandlers_1.NotFoundError("Transaction does not exist");
    return transaction;
});
const transactionService = {
    findById,
    findByReference,
    createTransaction,
    updateTransactionStatus,
    deleteTransaction,
};
exports.default = transactionService;
