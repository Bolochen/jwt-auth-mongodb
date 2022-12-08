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
    <div className='border-solid border-2 border-sky-500 bg-gray-400 py-3 h-16'>
        <button onClick={Logout} className='float-right p-3 text-white bg-green-500 rounded-xl '>Logout</button>
    </div>
  )
}

export default Navbar