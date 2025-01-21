import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CaptainLogin = () => {
   const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captainData,setCaptainData] = useState({})
  
    const submitHandler = (e) => {
      e.preventDefault();
      setCaptainData({
        email:email,
        password:password
      })
      setEmail('')
      setPassword('')
    };
  return (
    <div className="p-7 flex flex-col justify-between h-screen">
         <div>
           <img
             className="w-16 mb-10"
             src="https://www.svgrepo.com/show/505031/uber-driver.svg"
           />
           <form onSubmit={submitHandler}>
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
             Join a fleet?
             <Link to="/captain_signup" className="text-blue-600">
               Register as a Captain
             </Link>
           </p>
         </div>
   
         <div>
           <Link to='/login' className="bg-[#d5622d] text-white font-semibold mb-7 rounded px-4 py-2 w-full flex justify-center">
             Sign in as User
           </Link>
         </div>
       </div>
  )
}

export default CaptainLogin