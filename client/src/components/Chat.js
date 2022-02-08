import React, { useState, useEffect } from 'react';
import Header from './Header';
import Navbar from './Navbar';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import { io } from "socket.io-client";

let data = []
let socket

export default function Chat() {
  // Conversation / Cookies
  const [conv, setConv] = useState([])
  const [lastMsg, setLastMsg] = useState([])
  const [load, setLoad] = useState(false)
  const [cookies] = useCookies(['userId']);
  const [socketConnected, setSocketConnected] = useState(false)
  const [connected, setConnected] = useState()

  // Socket io connection
  useEffect(() => {
    socket = io.connect("https://becode-star-tup.herokuapp.com", {
      forceNew: false,
      secure: true,
      transports: ['websocket']
    });
    socket.emit('setup', cookies.userId)
    socket.on('connected', (users) => {
      console.log("users : ", users);
      setConnected(users)
    })
  }, []);

  // console.log(io.sockets.sockets)
  useEffect(() => {
    axios.get("/api/conversations/")
      .then(res => {
        setConv(res.data)
        if ((data.length === 0)) {
          res.data.map(id => {
            axios.get(`/api/messages/${id._id}/last`)
              .then(res2 => {
                if (res2.data.length > 0) {
                  data.push({
                    id: res2.data[0].conversationId,
                    msg: res2.data[0].content,
                    date: new Date(res2.data[0].createdAt),
                    sender: res2.data[0].sender
                  })
                  setLastMsg(data)
                  if (data.length >= res.data.length) {
                    setLoad(true)
                  }
                }
                else {
                  setLoad(true)
                }
              })
              .catch(err2 => console.log(err2))
          })
        }
        else if ((data.length > 0) && (lastMsg.length === 0)) {
          setLastMsg(data)
          setLoad(true)
        }
      })
      .catch(err => console.log(err))
  }, [connected]);

  // Date format
  function changeDate(date) {
    const todayDate = new Date()
    // Not Same Year dd/mm/yyyy
    if (date.getFullYear() !== todayDate.getFullYear()) {
      return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })
    }
    // Same Day hh/mm
    else if (todayDate.toLocaleDateString('en-GB') === date.toLocaleDateString('en-GB')) {
      const o = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit"
      });
      return o.format(date)
    }
    // Everything else dd/mm
    else {
      return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric' })
    }
  }

  return (
    <>
      <Header page="Discussions" />
      {/* Wait till loading */}
      {load === false ?
        <p>loading</p>
        :
        <main className='flex flex-col py-16 items-center bg-[#111b21]'>
          {/* if conversation map */}
          {conv.length > 0 ? conv.map((conv, index) => {
            return (
              <>
                {/* If there is at least 2 member */}
                {conv.members.length > 1 ?
                  // Link to conversation with conv id / other member name / other member id
                  <Link className='flex py-4 w-11/12 justify-between items-center my-1 h-20 bg-[#202c33] px-4 rounded-lg'
                    key={conv._id}
                    to={
                      conv.members.find(member => member._id !== cookies.userId) ?
                        "/app/chat/" + conv._id + "/" + conv.members.find(member => member._id !== cookies.userId).firstname + "/" + conv.members.find(member => member._id !== cookies.userId)._id
                        :
                        "/app/chat/" + conv._id + "/" + conv.members[0].firstname + "/" + conv.members[0]._id
                    }>
                    <div className='flex w-full items-center'>
                      {/* Avatar icon */}
                      <button className='w-12 h-12 rounded-full bg-white mr-4'>
                        {Avatar(conv.members.find(member => member._id !== cookies.userId) ? conv.members.find(member => member._id !== cookies.userId).firstname[1] : conv.members[0].firstname[1])}
                        {connected.includes(conv.members.find(member => member._id !== cookies.userId)._id) === true ?
                          <div className='bg-green-500 w-4 h-4 rounded-full ml-8 mb-8 bottom-3 relative' />
                          :
                          null
                        }
                      </button>
                      <div>
                        {/* Username */}
                        <h1 className='text-lg font-medium text-white'>
                          {conv.members.find(member => member._id !== cookies.userId) ? conv.members.find(member => member._id !== cookies.userId).firstname : "Me"}
                        </h1>
                        {/* Last message */}
                        {/* {lastMsg.find(msg => msg.id === conv._id ?
                          <p className='text-sm text-slate-500 truncate'>
                            {msg.sender === cookies.userId ? "Me : " : conv.members.find(member => member._id !== cookies.userId).firstname}
                            {msg.msg.length >= 20 ? msg.msg.substring(0, 25) + "..." : msg.msg}
                            {" - " + changeDate(msg.date)}
                          </p>
                          : null)} */}
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
            <p className='text-white pt-48'>Add <Link to={"/app/contact"} className='text-[#7aa5d2] hover:text-[#6798cc]' key={conv._id}>
              contact</Link> to start chatting
            </p>
          }
        </main>
      }
      <Navbar page="chat" />
    </>
  );
}