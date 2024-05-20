import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from '../components/Modal';

const Profile = () => {

    const [user, setUser] = useState([])
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);


    const fetchUserDetails = async () => {
        try {
            const response = await axios.get('http://localhost:3002/api/auth/details', { withCredentials: true });

            console.log(response.data)
            setUser(response.data.user)
        } catch (err) {
            console.log(err)
        }
    };



    const deleteUser = async () => {
        try {
            await axios.delete("http://localhost:3002/api/auth/delete", { withCredentials: true })
            console.log("User deleted successfully")

        } catch (error) {
            console.log(error)
        }
    }
    const handleSave = async (userData) => {
        try {
            await axios.put(`http://localhost:3002/api/auth/update/${user._id}`, userData, { withCredentials: true });
            fetchUserDetails();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const handleEditClick = () => {
        setCurrentUser(user);
        setIsModalOpen(true);
    };

    useEffect(() => {
        fetchUserDetails();
    }, []);

    return (

        <>
            <div className='flex flex-row justify-between px-10 py-4'>
                <h2 className='text-2xl font-semibold'>My Profile</h2>

                <div className='flex flex-row gap-[3rem]'>
                    <div className='flex flex-row text-[1.2rem] items-center gap-2' onClick={handleEditClick}> Update <FaUserEdit color='red' /> </div>
                    <div className='flex flex-row text-[1.2rem] items-center gap-2' onClick={deleteUser}> Delete <MdDelete color='red' /> </div>

                </div>



            </div>
            <div className='px-[4rem] mt-4'>
                {user ? <>
                    <h2>Name : {user.name}</h2>
                    <h2>Email : {user.email}</h2>
                </> : "No User Found"}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={currentUser}
            />
        </>
    )
}

export default Profile