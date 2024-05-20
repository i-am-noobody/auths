import React from 'react';
import Forms from '../components/Forms';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate()
    const handleRegister = async (formData) => {
        try {
            const response = await axios.post('http://localhost:3002/api/auth/signup', formData);
            navigate("/login")
            console.log(response)
        } catch (error) {
            console.error('Registration error:', error.response.data);
        }
    };

    return (
        <div className='flex flex-col justify-center items-center '>
            <h2 className='text-4xl mt-4'>Register</h2>
            <Forms formType="register" onSubmit={handleRegister} />
        </div>
    );
};

export default Register;
