import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Expense = () => {
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    title: '',
    amount: '',
    category: '',
    date: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.amount || !form.category || !form.date) {
      return toast.error("Please fill all fields!");
    }

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/expense/add`,
        {
          title: form.title,
          amount: form.amount,
          category: form.category,
          date: form.date,
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        }
      );

      if (res.data.success) {
        toast.success("Add Successful!!");
        setForm({ title: '', amount: '', category: '', date: '' });
        setTimeout(()=>{
          navigate("/");
        },500);
      } else {
        toast.error(res.data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add expense!");
    }
  };


  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Add a New Expense</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Expense Title"
          className="w-full border rounded px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount (₹)"
          className="w-full border rounded px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select Category</option>
          <option value="Food">🍽 Food</option>
          <option value="Transport">🚗 Transport</option>
          <option value="Shopping">🛍 Shopping</option>
          <option value="Bills">📄 Bills</option>
        </select>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default Expense;
