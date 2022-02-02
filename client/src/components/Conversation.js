import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Message from './Message';
import { io } from "socket.io-client";
import { useCookies } from 'react-cookie';

let socket

export default function Conversation() {
    // All messages / Send new message / Cookies / New message received / Conv id receiver name & id / Autoscroll / socketio
    const [conv, setConv] = useState([])
    const [message, setMessage] = useState({ content: "" })
    const [cookies, setCookie, removeCookie] = useCookies(['userId']);
    const [updatedMessage, setUpdatedMessage] = useState(false)
    const { id, name, receiverId } = useParams();
    const scrollRef = useRef()
    const [socketConnected, setSocketConnected] = useState(false)
    const user = cookies.userId

    // Socket io connection
    useEffect(() => {
        socket = io.connect("https://becode-star-tup.herokuapp.com/", {
            forceNew: false,
            secure: true,
            transports: ['websocket']
        });
        socket.emit('setup', user)
        socket.on('connection', () => setSocketConnected(true))
    }, []);

    // Fetch conv & fetch conv on new message
    useEffect(() => {
        fetchConv()
        if (updatedMessage) {
            setUpdatedMessage(false)
        }
    }, [updatedMessage])

    // Socket io receive new message
    useEffect(() => {
        socket.on('message received', (newMessageReceived) => {
            setUpdatedMessage(true)
            setMessage({ "content": newMessageReceived })
        })
    });

    // Fetch conv function
    const fetchConv = async () => {
        const fetch = await axios.get(`/api/messages/${id}`, { headers: { withCredentials: true } })
        const data = await fetch.data
        setConv(data)

        // Socket io join conv
        socket.emit('join chat', id)
    }

    //  Send message
    function sendMessage(e) {
        e.preventDefault()

        axios.post(`/api/messages/${id}`, message, { headers: { withCredentials: true } })
            .then(res => {
                e.target.reset()
                fetchConv()
            })
            .catch(err => console.log(err))

        // Socket io send new message
        socket.emit('new message', { message, user, receiverId })
    }

    // Auto scroll
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [conv])

    return (
        <div className='flex flex-col h-screen justify-between bg-[#111b21]'>
            <header className='flex items-center fixed w-full bg-[#202c33] pb-2 h-14 border-b-4 border-[#111b21]'>
                {/* Go back to chat page */}
                <Link to={"/app/chat"}>
                    <button className='text-white pl-4'><i className="fas fa-chevron-left"></i></button>
                </Link>
                <h1 className='m-auto pr-16 text-white'>{name}</h1>
            </header>
            <main className='flex flex-col h-screen overflow-y-auto pb-14 mt-14'>
                {/* if there is message map */}
                {conv.length > 0 ? conv.map((message, index) => {

                    return <div ref={scrollRef} key={message._id}><Message message={message} key={message._id} /></div>
                })
                    // if there isn't message show nothing
                    : null
                }
            </main >
            <div className='block fixed inset-x-0 bottom-0 z-10'>
                <form onSubmit={(e) => sendMessage(e)} className='flex w-full items-center h-14 bg-[#202c33] border-t-4 border-[#111b21]'>
                    <input type="text" required className='h-8 w-5/6 ml-2 placeholder pl-2 rounded-xl bg-[#2a3942] text-white focus:outline-none' placeholder='Aa' onChange={(e) => setMessage({ ...message, "content": e.target.value })} />
                    <button type='submit' className='ml-4 text-white text-2xl'><i className="fas fa-paper-plane"></i></button>
                </form>
            </div>

        </div >
    );
}
