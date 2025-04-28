import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Profile = () => {
  const [user, setUser] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data.user);
        setExpenses(res.data.expenses);

        const categories = res.data.expenses.reduce((acc, expense) => {
          if (acc[expense.category]) {
            acc[expense.category] += expense.amount;
          } else {
            acc[expense.category] = expense.amount;
          }
          return acc;
        }, {});
        
        setExpenseCategories(categories);

        const total = res.data.expenses.reduce((sum, expense) => sum + expense.amount, 0);
        setTotalAmount(total);

        const monthlyData = res.data.expenses.reduce((acc, expense) => {
          const month = new Date(expense.date).getMonth();
          if (acc[month]) {
            acc[month] += expense.amount;
          } else {
            acc[month] = expense.amount;
          }
          return acc;
        }, Array(12).fill(0));  
        setMonthlyExpenses(monthlyData);

      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch profile info");
      }
    };

    fetchData();
  }, []);

  const pieData = {
    labels: Object.keys(expenseCategories),
    datasets: [
      {
        data: Object.values(expenseCategories),
        backgroundColor: [
          "#ff9999", "#66b3ff", "#99ff99", "#ffcc99", "#ffb3e6", "#c2c2f0", "#ffb3b3"
        ],
        hoverOffset: 4,
      },
    ],
  };

  const barData = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],
    datasets: [
      {
        label: "Monthly Expenses",
        data: monthlyExpenses,
        backgroundColor: "#66b3ff",
        borderColor: "#4c8cff",
        borderWidth: 1,
      },
    ],
  };

  if (!user) {
    return <div className="text-center mt-10 text-gray-600">Loading profile...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Your Profile</h2>

        <div className="space-y-4 text-gray-700">
          <div className="flex justify-between">
            <span className="font-semibold">Name:</span>
            <span>{user.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Email:</span>
            <span>{user.email}</span>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-4 text-gray-800">Expense Summary</h3>
        <div className="flex justify-between text-gray-600 mb-4">
          <div>
            <span className="font-semibold">Total Expenses:</span>
            <p className="text-xl font-bold">₹{totalAmount}</p>
          </div>
          <div>
            <span className="font-semibold">Most Expensive Category:</span>
            <p className="text-xl font-bold">{Object.keys(expenseCategories).reduce((a, b) => expenseCategories[a] > expenseCategories[b] ? a : b)}</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-4 text-gray-800">Recent Expenses</h3>
        <div className="space-y-3">
          {expenses.slice(0, 10).map((expense) => (
            <div key={expense._id} className="border p-3 rounded-md shadow-sm hover:shadow-lg transition duration-200">
              <div className="flex justify-between">
                <span className="font-medium">{expense.title}</span>
                <span className="text-indigo-600 font-semibold">₹{expense.amount}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>{expense.category}</span>
                <span>{new Date(expense.date).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Expense Breakdown</h3>
        <div className="w-full max-w-sm mb-6">
          <Pie data={pieData} options={{ responsive: true }} />
        </div>

        <h3 className="text-xl font-semibold mb-4 text-gray-800">Monthly Expense Trend</h3>
        <div className="w-full max-w-sm">
          <Bar data={barData} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
