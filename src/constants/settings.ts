import { config } from "dotenv";
import { collections } from "./collections";

config();

export const settings = {
  port: process.env.PORT,

  mongo: {
    url: process.env.MONGO_URL,
    collections: {
      user: collections.user,
      auth: collections.auth,
      agent: collections.agent,
      property: collections.property,
      article: collections.article,
      comment: collections.comment,
      review: collections.review,
      chat: collections.chat,
      message: collections.message,
      bidding: collections.bidding,
      transaction: collections.transaction,
      wallet: collections.wallet,
    },
  },

  jwt: {
    secret: process.env.SECRET,
  },

  cloudinary: {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  },

  paystack: {
    test: process.env.PAYSTACK_TEST,
  },
};
