import React, { useState, useEffect } from 'react';
import './modal.css';

const Modal = ({ isOpen, onClose, onSave, initialData }) => {
    const [userData, setUserData] = useState({ name: '', email: '', password: '' });

    useEffect(() => {
        if (initialData) {
            setUserData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(userData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Update User</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={userData.name || ""}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={userData.email || ""}
                            onChange={handleChange}
                            required
                        />

                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={userData.password || ""}
                            onChange={handleChange}
                            required
                        />

                    </div>
                    <button type="submit">Update</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default Modal;
