import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { newRequest } from '../../utils/createRequest';
import { useDispatch } from 'react-redux';
import { login } from '../../features/userReducer';


const Login: React.FC = () => {

  const dispatch = useDispatch();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<any>("");
  const navigate = useNavigate();


  const loginHandler = async () => {
    if (!username || !password) return alert("enter username and password");

    try {
      const res = await newRequest.post("/api/auth/login", {
        username, password
      });

      localStorage.setItem("currentUser", JSON.stringify(res.data));
      dispatch(login(res.data));
      setMessage("logged in")
      navigate("/")

    } catch (e) {
      const error = e as AxiosError;
      setMessage(error.response?.data);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("currentUser")) navigate("/");
  }, [])

  return (
    <div className='w-[100vw] h-[90vh] flex items-center justify-center'>
      <div className='flex flex-col gap-4'>
        <span className='text-center'>{message}</span>
        <div className='flex flex-col gap-0'>
          <span>username</span>
          <input placeholder='enter username' value={username} type='text' onChange={(e) => setUsername(e.target.value)}
            className='bg-[#EAEAEA]'
          />
        </div>

        <div className='flex flex-col gap-0'>
          <span>password</span>
          <input placeholder='enter password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}
            className='bg-[#EAEAEA]'
          />
        </div>

        <div>
          <button className='rounded-full bg-black px-4 flex items-center h-6' onClick={loginHandler}>
            <span className='text-white text-[.6rem] font-bold'>LOG IN</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login