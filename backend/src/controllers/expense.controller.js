import { Expense } from '../models/expenseModel.js';

export const addExpense = async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;
    const userId = req.user._id;

    if (!title || !amount || !category || !date || !userId) {
      return res.status(400).json({ success: false, message: "Please fill all fields" });
    }

    const newExpense = new Expense({
      title,
      amount,
      category,
      date,
      userId,
    });

    await newExpense.save();

    res.status(201).json({
      success: true,
      message: "Expense added successfully!", 
      expense: newExpense 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
