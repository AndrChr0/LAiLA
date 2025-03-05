import React, { use } from 'react'
import { useState } from 'react'
import axios from 'axios'


const Register = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('student')


    const handleRegisterUser = (e) => {
        e.preventDefault()
        
        axios.post('http://localhost:5310/api/auth/register', {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            role: role
        })
        .then(response => {
            window.location.href = '/login'
        })
        .catch(error => {
            console.error('There was an error registering the user:', error)
        })
    }
return (
    <>
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div>
                <h1 className="mb-6 text-3xl">Register</h1>
                <form className="w-full max-w-sm p-6 bg-white rounded shadow-md" onSubmit={handleRegisterUser}>
                    <label className="block mb-2" htmlFor="first_name">First Name</label>
                    <input className="w-full p-2 mb-4 border rounded" type="text" id="first_name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
                    
                    <label className="block mb-2" htmlFor="last_name">Last Name</label>
                    <input className="w-full p-2 mb-4 border rounded" type="text" id="last_name" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
                    
                    <label className="block mb-2" htmlFor="email">Email</label>
                    <input className="w-full p-2 mb-4 border rounded" type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    
                    <label className="block mb-2" htmlFor="password">Password</label>
                    <input className="w-full p-2 mb-4 border rounded" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    
                    <button className="w-full px-4 py-2 text-white bg-blue-500 rounded blue-button hover:bg-blue-700" type='submit'>Register</button>
                </form>
            </div>
            <div><p>Already have an account? Log in <a className='text-blue-700' href="/login">here</a></p></div>
        </div>
    </>
)
}

export default Register