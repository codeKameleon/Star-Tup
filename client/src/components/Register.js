import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/js/all.js'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [data, setData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    birthdate: "",
    password: "",
    motto: ""
  })
  const [error, setError] = useState({})

  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()

    axios.post(`http://localhost:9000/api/account/register`, data)
      .then((res) => {
        navigate("/login", { replace: true })
      })
      .catch(err => setError(err.response.data.message))
  }

  return (
    <>
      <main className='flex flex-col items-center sm:px-6 lg:px-8 h-full bg-[#47555e]'>
        <header className='bg-[#47555e]'>
          <Link to={"/"}>
            <button className='px-5 py-4 text-white'><i className="fas fa-chevron-left"></i></button>
          </Link>
          <img src="logo.png" alt="logo" className='w-3/4 m-auto mb-10' />
        </header>

        {error.length > 0 ? <p className='text-[#b33232] text-sm m-auto text-center'>{error}</p> : null}

        <form onSubmit={e => handleSubmit(e)} className='mt-0 space-y-4 flex flex-col'>
          <h2 className='mt-6 text-center text-2xl font-extrabold text-white'>Register an account</h2>
          <label htmlFor="email" className='sr-only'>Email</label>
          <input type="email" onChange={e => setData({ ...data, email: e.target.value })} name='email' required className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm' placeholder="Email address" />

          <label htmlFor="fistname" className='sr-only'>First name</label>
          <input type="text" name='fistname' onChange={e => setData({ ...data, firstname: e.target.value })} required className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm' placeholder='First Name' />

          <label htmlFor="lastname" className='sr-only'>Last name</label>
          <input type="text" name='lastname' onChange={e => setData({ ...data, lastname: e.target.value })} required className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm' placeholder='Last Name' />

          <label htmlFor="birthdate" className='sr-only'>Birthdate</label>
          <input type="date" name='birthdate' onChange={e => setData({ ...data, birthdate: e.target.value })} required className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm' max={new Date()} />

          <label htmlFor="password" className='sr-only'>Password</label>
          <input type="password" name='password' onChange={e => setData({ ...data, password: e.target.value })} required className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm' placeholder='Password' />

          <label htmlFor="moto" className='sr-only'>Personal motto (optional)</label>
          <input type="text" name='moto' onChange={e => setData({ ...data, motto: e.target.value })} className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm' placeholder='Personal moto (optional)' />

          <button type='submit' className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#7aa5d2] hover:bg-[#6798cc] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Register</button>
          <p className='text-white text-center'>Already have an account ? <Link to="/login" className='text-[#7aa5d2] hover:text-[#6798cc]'>Login</Link></p>
        </form>
      </main>
    </>
  )
}