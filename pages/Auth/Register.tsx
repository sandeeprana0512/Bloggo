import React, { useState } from 'react'
import { AxiosError } from 'axios';
import { newRequest } from "../../utils/createRequest";

const Register: React.FC = () => {

    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [file, setFile] = useState<any>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<any>("");

    const registerHandler = async () => {
        if (!username || !email || !password || !name) return alert("please fill all the details");

        try {
            const res = await newRequest.post("/api/auth/register", {
                username,
                email,
                name,
                password,
                file
            })

            setMessage(res.data);
        } catch (e) {
            const error = e as AxiosError;
            setMessage(error.response?.data)
        }
    }

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
                    <span>name</span>
                    <input placeholder='enter username' value={name} type='text' onChange={(e) => setName(e.target.value)}
                        className='bg-[#EAEAEA]'
                    />
                </div>

                <div className='flex flex-col gap-0'>
                    <span>email</span>
                    <input placeholder='enter email' value={email} type='email' onChange={(e) => setEmail(e.target.value)}
                        className='bg-[#EAEAEA]'
                    />
                </div>

                <div className='flex flex-col gap-0'>
                    <span>password</span>
                    <input placeholder='enter password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}
                        className='bg-[#EAEAEA]'
                    />
                </div>
                <div className='flex flex-col gap-0'>
                    <span>profile picture</span>
                    <input onChange={(e) => { if (e.target.files !== null) setFile(e.target.files[0]) }} type='file' />
                </div>
                <div>
                    <button className='rounded-full bg-black px-4 flex items-center h-6' onClick={registerHandler}>
                        <span className='text-white text-[.6rem] font-bold'>SIGN UP</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Register