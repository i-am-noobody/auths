import React from 'react'
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom"


const Homepage = () => {
    return (
        <div className='flex flex-col justify-between px-10'>
            <h2 className='text-3xl text-red mt-4 font-semibold'>Welcome to Authentication System</h2>

            <div className='flex flex-col gap-4 mt-8 text-[1.8rem]'>
                <Link to="/signup">Signup </Link>
                <Link to="/login">Login</Link>
                <Link to="/profile" className='flex flex-row items-center gap-1 text-blue-500'>Profile <FaUserAlt /> </Link>
            </div>
        </div>
    )
}

export default Homepage