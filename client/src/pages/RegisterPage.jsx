import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useState } from 'react';
import axios from "axios"

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function registerUser(event) {
        event.preventDefault();
        try {
            await axios.post('/register', {
                name, 
                email, 
                password,
            });
            alert('Registration Successfull. Now you can log in!');
            setRedirect(true);
        }
        catch (event){
            alert('Registration Failed!. Please Try again later.');
        }
    }

    if(redirect) {
        return <Navigate to={'/login'} />
    }

    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-64'>
                <h1 className='text-4xl text-center mb-4'>Register</h1>
                <form className='max-w-md mx-auto' onSubmit={registerUser}>
                    <input type="text"
                        placeholder='John Doe'
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                    />
                    <input type="email"
                        placeholder='your@gmail.com'
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                    <input type="password"
                        placeholder='password'
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <button className='primary'>Register</button>
                    <div className='text-center py-2 text-gray-500'>
                        Already a member? <Link className="underline text-black" to={'/login'}>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
