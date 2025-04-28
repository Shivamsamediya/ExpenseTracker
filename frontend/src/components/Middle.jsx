import React from 'react';

const Middle = () => {
  return (
    <div className="bg-gray-50 text-gray-800">

      <div className="flex flex-col md:flex-row justify-between items-center gap-10 px-6 py-16 max-w-6xl mx-auto">
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-extrabold mb-4">
            Track Your Expenses Smartly 💸
          </h2>
          <p className="text-lg text-gray-600">
            Visualize and manage your spending habits with real-time insights.
          </p>
        </div>

        <img
          src="https://cdn-icons-png.flaticon.com/512/2331/2331970.png"
          alt="Expense Chart"
          className="w-64 md:w-80 drop-shadow-lg"
        />
      </div>

      <hr className="border-gray-300 my-8 mx-auto w-[80%]" />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <h3 className="text-3xl font-bold text-center mb-10">Why Use This App?</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition duration-300">
            <h4 className="text-xl font-semibold mb-2">📊 Visual Insights</h4>
            <p className="text-gray-600">
              Get easy-to-read charts that help you understand your expenses better.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition duration-300">
            <h4 className="text-xl font-semibold mb-2">💡 Smart Categorization</h4>
            <p className="text-gray-600">
              Your expenses are categorized automatically so you can plan wisely.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition duration-300">
            <h4 className="text-xl font-semibold mb-2">🔐 100% Secure</h4>
            <p className="text-gray-600">
              We respect your privacy. Your data stays safe with industry-level security.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Middle;
