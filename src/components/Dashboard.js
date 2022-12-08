import React, {useState, useEffect} from 'react';
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getUsers();
  }, []);
  
  const refreshToken = async() => {
    try {
      const response = await axios.get('http://localhost:5000/token');
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.name);
      setExpire(decoded.exp);
    } catch (error) {
      if(error.response){
        navigate("/");
      }
    }
  }

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(async(config) => {
    const currentDate = new Date();
    if(expire * 1000 < currentDate.getTime()){
      const response = await axios.get('http://localhost:5000/token');
      config.headers.Authorization = `Bearer ${response.data.accessToken}`;
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.name);
      setExpire(decoded.exp);
    }
    return config;
  }, (error) =>{
    return Promise.reject(error);
  })

  const getUsers = async() => {
    const response = await axiosJWT.get('http://localhost:5000/users', {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    setUsers(response.data);
  }

  return (
    <div>
        <h1>Welcome Back: {name}</h1>
        <button onClick={getUsers} className='bg-green-500 rounded-2xl p-3 text-white mb-4'>Get Users</button>
        <table class="border border-slate-600 text-sm text-left text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 border border-slate-600">
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody className='border border-slate-600'>
            { users.map((user, index) => (
                          <tr key={user.id} class="bg-white border-b">
                          <td>{index + 1 }</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                        </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}

export default Dashboard