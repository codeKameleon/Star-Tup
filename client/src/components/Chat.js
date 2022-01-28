import React, { useState, useEffect } from 'react';
import Header from './Header';
import Navbar from './Navbar';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';

export default function Chat() {
  const [conv, setConv] = useState([])
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);

  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/conversations/`, { headers: { withCredentials: true } })
      .then(res => {
        setConv(res.data)
      })
      .catch(err => navigate("/login") + alert("You need to login first"))
  }, []);

  return (
    <>
      <Header page="Discussions" />
      <main className='bg-[#eceeee] flex flex-col py-16 items-center'>
        {conv.length > 0 ? conv.map((conv, index) => {
          return (
            <Link to={"/chat/" + conv._id + "/" + conv.members.find(member => member._id !== cookies.jwt).firstname + "/" + conv.members.find(member => member._id !== cookies.jwt)._id} key={conv._id} className='flex py-4 w-11/12 justify-between items-center my-2 h-20 bg-[#c7ccce] px-4 rounded-lg border-b-4 border-r-4 border-[#b5bbbe] border-l-2 border-t-2'>
              <div className='flex w-full items-center'>
                <button className='w-12 h-12 rounded-full bg-white mr-4'>{conv.members.find(member => member._id !== cookies.jwt).firstname[0]}</button>
                <div>
                  <h1 className='text-lg font-medium text-slate-900'>{conv.members.find(member => member._id !== cookies.jwt).firstname}</h1>
                  <p className='text-sm text-slate-500 truncate'>{conv.messages}</p>
                </div>
              </div>
            </Link>
          );
        })
          : null}
      </main>
      <Navbar page="chat" />
    </>
  );
}