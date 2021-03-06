import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
axios.defaults.withCredentials = true


export default function Login() {
  // Login detail / Error on login / Cookies / Navigate
  const [data, setData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState({})
  const [cookies, setCookie] = useCookies(['userId']);
  const navigate = useNavigate()

  // Post login
  const handleSubmit = e => {
    e.preventDefault()

    axios.post(`${process.env.REACT_APP_PREFIX_API_URL}/api/account/login`, data, { credentials: 'same-origin' })
      .then(res => {
        setCookie('userId', res.data.user_id)
        navigate("/app/chat", { replace: true })
      })
      .catch(err => setError(err.response.data.message))
  }

  return (
    <>
      <main className='flex flex-col items-center sm:px-6 lg:px-8 h-full'>
        <header>
          {/* Go back to landing page screen */}
          <Link to={"/app"}>
            <button className='px-5 py-4 text-white'><i className="fas fa-chevron-left"></i></button>
          </Link>
          <img src="../logo.png" alt="logo" className='w-3/4 m-auto mb-10' />
        </header>
        {/* Error message */}
        {error.length > 0 ?
          <div className='absolute w-3/4 text-center mt-72'>
            <p className='text-[#fa5f5f] text-xl'>{error}</p>
          </div>
          : null}

        {/* Login form */}
        <form onSubmit={(e) => handleSubmit(e)} className='mt-0 space-y-4 flex flex-col'>
          <h2 className='mt-6 text-center text-2xl font-extrabold text-white'>Login to your account</h2>
          <label htmlFor="email" className='sr-only'>Email</label>
          <input type="email" autoComplete='on' name='email' onChange={e => setData({ ...data, email: e.target.value })} required className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm' placeholder="Email address" />

          <label htmlFor="password" className='sr-only'>Password</label>
          <input type="password" autoComplete='on' name='password' onChange={e => setData({ ...data, password: e.target.value })} required className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm' placeholder='Password' />


          <button type='submit' className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#7aa5d2] hover:bg-[#6798cc] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Login</button>
          <p className='text-white text-center'>Don't have an account ? <Link to="/app/register" className='text-[#7aa5d2] hover:text-[#6798cc]'>Register</Link></p>
        </form>

      </main>
    </>
  );
}
