import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const Register = async (e) =>{
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/users', {
                name: name,
                email: email,
                password: password,
                confPassword: confPassword
            });
            navigate("/");
        } catch (error) {
            if (error.response) {   
                setMsg(error.response.data.msg);
            }
        }
    }

  return (
    <div className='container'>
        <div class="max-w-lg my-10 border border-slate-200 rounded-xl mx-auto shadow-md font-inter p-5">
        <h1 className='text-4xl text-center mb-3'>Register Form</h1>
        <form onSubmit={Register}>
            <p className='has-text-centered'>{msg}</p>
            <label for="name">
                <span className="block font-semibold mb-1 text-slate-700 after:content-['*'] after:text-pink-500 after:ml-0.5">Nama</span>
                <input type="text" id="id" placeholder="Masukkan Nama" className="mb-4 px-3 py-2 border shadow rounded w-full block text-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label for="email">
                <span className="block font-semibold mb-1 text-slate-700 after:content-['*'] after:text-pink-500 after:ml-0.5">Email</span>
                <input type="email" id="id" placeholder="Masukkan Email" className="px-3 py-2 border shadow rounded w-full block text-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <p className="text-sm m-1 text-pink-700 invisible peer-invalid:visible">Email tidak valid</p>
            </label>
            <label for="password">
                <span className="block font-semibold mb-1 text-slate-700 after:content-['*'] after:text-pink-500 after:ml-0.5">Password</span>
                <input type="password" id="id" placeholder="Masukkan Password" className="mb-4 px-3 py-2 border shadow rounded w-full block text-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <label for="confPassword">
                <span className="block font-semibold mb-1 text-slate-700 after:content-['*'] after:text-pink-500 after:ml-0.5">Konfirmasi Password</span>
                <input type="password" id="id" placeholder="Masukkan Konfirmasi Password" className="mb-4 px-3 py-2 border shadow rounded w-full block text-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />
            </label>
            <button class="my-10 bg-sky-500 px-5 py-2 rounded-full text-white font-semibold font-inter block mx-auto hover:bg-sky-600 active:bg-sky-700 focus:ring focus:ring-sky-300">Login</button>
        </form>
        </div>
    </div>
  )
}

export default Register