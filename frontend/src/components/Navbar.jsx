import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');

    toast.success('Logout Successful!!');

    window.location.reload();

    setTimeout(() => {
      navigate('/');
    }, 1000);

  };

  return (
    <nav className="bg-[#6b7280] text-white shadow-md px-8 py-4 flex flex-wrap items-center justify-between">
      
      <Link
        to="/"
        className="text-xl font-extrabold tracking-wide border-2 border-white rounded-xl px-4 py-2 hover:bg-white hover:text-[#6b7280] transition-all duration-300"
      >
        💰 Expense Tracker
      </Link>

      <div className="flex gap-6 text-sm sm:text-base mt-4 sm:mt-0">
        <Link
          to="/add-expense"
          className="relative font-semibold px-3 py-2 rounded-md overflow-hidden border-2 border-transparent hover:border-white transition-all duration-300"
        >
          Add Expense
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
        </Link>

        <Link
          to="/profile"
          className="relative font-semibold px-3 py-2 rounded-md overflow-hidden border-2 border-transparent hover:border-white transition-all duration-300"
        >
          Profile
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
        </Link>

        <Link
          to="/contact"
          className="relative font-semibold px-3 py-2 rounded-md overflow-hidden border-2 border-transparent hover:border-white transition-all duration-300"
        >
          Contact
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
        </Link>
      </div>

      <div className="mt-4 sm:mt-0">
        {token ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-2 py-2 rounded-lg font-bold transition-all duration-300 text-sm sm:text-base shadow-md hover:shadow-lg"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-white text-gray-700 hover:bg-gray-800 hover:text-white px-2 py-2 rounded-lg font-bold transition-all duration-300 text-sm sm:text-base shadow-md hover:shadow-lg"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
