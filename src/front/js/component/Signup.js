import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await actions.signup( email, password );
            navigate('/login');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Signup</h1>
            <input 
                name="email" 
                value={email} 
                onChange={(e)=> setEmail(e.target.value)} 
                placeholder="Email" 
            />
            <input 
                name="password" 
                type="password" 
                value={password} 
                onChange={(e)=> setPassword(e.target.value)} 
                placeholder="Password" 
            />
            <button onClick={handleSignup}>
                Enter
            </button>
        </div>
    );
};

