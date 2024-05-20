import React from 'react';
import Forms from '../components/Forms';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()
    const handleLogin = async (formData) => {
        try {
            const response = await axios.post('http://localhost:3002/api/auth/login', formData);
            navigate("/")
            console.log('Login successful:', response);


        } catch (error) {
            console.error('Login error', error.response);
        }
    };

    return (
        <div className='flex flex-col justify-center items-center '>
            <h2 className='text-4xl mt-4'>Login</h2>
            <Forms formType="login" onSubmit={handleLogin} />
        </div>
    );
};

export default Login;
