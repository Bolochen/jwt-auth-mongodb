import React from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const Logout = async() => {
    try {
      await axios.delete('http://localhost:5000/logout');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div class="bg-white border-gray-200 dark:bg-gray-900">
    <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
        <a href="/dashboard" class="flex items-center">
            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Home</span>
        </a>
        <div class="flex items-center">
            <a class="mr-6 text-sm font-medium text-gray-500 dark:text-white hover:underline">Options</a>
            <button onClick={Logout} className='float-right p-3 text-white bg-green-500 rounded-xl '>Logout</button>
        </div>
    </div>
    </div>
  )
}

export default Navbar