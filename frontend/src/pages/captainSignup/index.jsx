import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const CaptainSignup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [userData,setUserData]=useState({})
  
    const submitHandler = (e) => {
      e.preventDefault();
      setUserData({
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:password
      })
      setEmail('')
      setPassword('')
      setFirstName('')
      setLastName('')
    };

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
    <div>
      <img
        className="w-16 mb-10"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
      />
      <form onSubmit={submitHandler}>
      <h3 className="text-lg font-medium mb-2">What's your Name</h3>
      <div className='flex gap-4 mb-5'>
      <input
          required
          className="bg-[#eeeeee] mb-7 border rounded px-4 py-2 w-full text-lg placeholder:text-base"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="first name"
        />
         <input
          required
          className="bg-[#eeeeee] mb-7 border rounded px-4 py-2 w-full text-lg placeholder:text-base"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="last name"
        />
      </div>
        <h3 className="text-lg font-medium mb-2">What's your email</h3>
        <input
          required
          className="bg-[#eeeeee] mb-7 border rounded px-4 py-2 w-full text-lg placeholder:text-base"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@example.com"
        />
        <h3 className="text-lg font-medium mb-2">Enter Password</h3>
        <input
          required
          className="bg-[#eeeeee] mb-7 border rounded px-4 py-2 w-full text-lg placeholder:text-base"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="bg-[#111] mb-3 text-white font-semibold px-4 py-2 w-full text-lg placeholder:text-base">
          Login
        </button>
      </form>
      <p className="text-center">
        New here?
        <Link to="/signup" className="text-blue-600">
          Create new Account
        </Link>
      </p>
    </div>

    <div>
      <Link
       to='/captain_login' className="bg-[#10b461] text-white font-semibold mb-7 rounded px-4 py-2 w-full flex justify-center">
        Sign in as Captain
      </Link>
    </div>
  </div>
  )
}

export default CaptainSignup