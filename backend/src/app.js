import categoryRouter from './routes/categories.router';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import productRouter from './routes/products.router';
import userRouter from './routes/users.router';

/* config */
const app = express();
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

/* routes */
app.use('/api', categoryRouter);
app.use('/api', productRouter);
app.use('/api', userRouter);

/* db */
mongoose
	.connect('mongodb://127.0.0.1:27017/database_le_van_linh')
	.then(() => console.log('Connected!'))
	.catch(() => console.log('Connection failed!'));

/* server */
export const viteNodeApp = app;
