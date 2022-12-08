import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const Auth = async (e) =>{
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/login', {
                email: email,
                password: password
            });
            navigate("/dashboard");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

  return (
    <div className='container'>
        <div class="max-w-lg my-10 border border-slate-200 rounded-xl mx-auto shadow-md font-inter p-5">
        <h1 className='text-4xl text-center mb-3'>Login Form</h1>
        <form onSubmit={ Auth }>
            <p className='has-text-centered'>{msg}</p>
            <label for="name">
                <span className="block font-semibold mb-1 text-slate-700 after:content-['*'] after:text-pink-500 after:ml-0.5">Username / Email</span>
                <input type="text" id="id" placeholder="Masukkan Username" className="mb-4 px-3 py-2 border shadow rounded w-full block text-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label for="password">
                <span className="block font-semibold mb-1 text-slate-700 after:content-['*'] after:text-pink-500 after:ml-0.5">Password</span>
                <input type="password" id="id" placeholder="Masukkan Password" className="mb-4 px-3 py-2 border shadow rounded w-full block text-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <button class="my-10 bg-sky-500 px-5 py-2 rounded-full text-white font-semibold font-inter block mx-auto hover:bg-sky-600 active:bg-sky-700 focus:ring focus:ring-sky-300">Login</button>
        </form>
        </div>
    </div>
  )
}

export default Login