import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundhandler } from './middleware/notFoundHandler.js';
import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(logger);
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// routes
app.use(notesRoutes);
app.use(authRoutes);
app.use(userRoutes);

// middleware
app.use(notFoundhandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
