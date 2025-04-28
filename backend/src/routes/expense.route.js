import express from 'express';
import { addExpense } from '../controllers/expense.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/add', protect , addExpense);

export default router;
