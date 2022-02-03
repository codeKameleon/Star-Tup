import React, { useState, useEffect } from 'react';
import Header from './Header';
import Navbar from './Navbar';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from './Avatar';

export default function Chat() {
  // Conversation / Cookies / Navigate
  const [conv, setConv] = useState([])
  const [cookies, setCookie, removeCookie] = useCookies(['userId']);
  const navigate = useNavigate()

  // Fetch all user conversation
  useEffect(() => {
    axios.get("http://localhost:9000/api/conversations/")
      .then(res => {
        setConv(res.data)
      })
      .catch(err => console.log(err))
  }, []);

  return (
    <>
      <Header page="Discussions" />
      <main className='flex flex-col py-16 items-center bg-[#111b21]'>
        {/* if conversation map */}
        {conv.length > 0 ? conv.map((conv, index) => {
          return (
            <>
              {/* If there is at least 2 member */}
              {conv.members.length > 1 ?
                // Link to conversation with conv id / other member name / other member id
                <Link to={"/app/chat/" + conv._id + "/" + conv.members.find(member => member._id !== cookies.userId).firstname + "/" + conv.members.find(member => member._id !== cookies.userId)._id} key={conv._id}className='flex py-4 w-11/12 justify-between items-center my-1 h-20 bg-[#202c33] px-4 rounded-lg'>
                  <div className='flex w-full items-center'>
                    <button className='w-12 h-12 rounded-full bg-white mr-4'>{Avatar(conv.members.find(member => member._id !== cookies.userId).firstname[1])}</button>
                    <div>
                      <h1 className='text-lg font-medium text-white'>{conv.members.find(member => member._id !== cookies.userId).firstname}</h1>
                      <p className='text-sm text-slate-500 truncate'>{conv.messages}</p>
                    </div>
                  </div>
                </Link>
                // if there is only 1 member show nothing
                : null}
            </>
          );
        })
          // if no conversation show message with link
          :
          <p className='text-white pt-48'>Add <Link to={"/app/contact"} className='text-[#7aa5d2] hover:text-[#6798cc]'>contact</Link> to start chatting</p>
        }
      </main>
      <Navbar page="chat" />
    </>
  );
}