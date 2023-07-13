import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimiter from 'express-rate-limit';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import { errorHandler, notFound } from './utils/errorHandlers';
import authRoutes from './routes/authRoutes';

config();

const app: express.Application = express();

/**
 * Middlewares
 */
// Max of 20 requests per minute
app.use(
  rateLimiter({
    windowMs: 60000,
    max: 20,
  })
);
// Helps to secure requests by setting headers
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Routes
 */
app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: 'Welcome to realtor API' });
});

app.use('/auth', authRoutes);

/**
 * Error Handlers
 */
app.use(errorHandler);
app.all('*', notFound);

/**
 * Connection
 */

const port: string | number | undefined = process.env.PORT || 3001;

mongoose
  .connect(process.env.DB_URL as string)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
