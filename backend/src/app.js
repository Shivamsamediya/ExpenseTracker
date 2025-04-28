import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import expenseRoutes from './routes/expense.route.js';
import userRoutes from './routes/user.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin:[ 'http://localhost:5173' ],
    credentials: true,            
}));

app.get('/', (req,res,next) =>{
    res.send("Hello");
});

app.use('/expense', expenseRoutes);
app.use('/user', userRoutes);

export default app;