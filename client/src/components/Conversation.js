import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Message from './Message';
import { io } from "socket.io-client";
import { useCookies } from 'react-cookie';

let socket

export default function Conversation() {
    const [conv, setConv] = useState([])
    const [message, setMessage] = useState({ content: "" })
    const [cookies, setCookie, removeCookie] = useCookies(['userId']);
    const [updatedMessage, setUpdatedMessage] = useState(false)
    const { id, name, receiverId } = useParams();
    const scrollRef = useRef()
    const [socketConnected, setSocketConnected] = useState(false)
    const user = cookies.jwt

    // Socket io
    useEffect(() => {
        socket = io.connect("https://becode-star-tup.herokuapp.com/", {
            forceNew: false,
            secure: true,
            transports: ['websocket']
        });
        socket.emit('setup', user)
        socket.on('connection', () => setSocketConnected(true))
    }, []);

    // Fetch conv
    useEffect(() => {
        fetchConv()
        if (updatedMessage) {
            setUpdatedMessage(false)
        }
    }, [updatedMessage])

    // Socket io
    useEffect(() => {
        socket.on('message received', (newMessageReceived) => {
            setUpdatedMessage(true)
            setMessage({ "content": newMessageReceived })
        })
    });

    // Fetch conv
    const fetchConv = async () => {
        const fetch = await axios.get(`/api/messages/${id}`, { headers: { withCredentials: true } })
        const data = await fetch.data
        setConv(data)

        // Socket io
        socket.emit('join chat', id)
    }

    //  Send message
    function sendMessage(e) {
        e.preventDefault()

        axios.post(`"/api/messages/"${id}`, message, { headers: { withCredentials: true } })
            .then(res => {
                e.target.reset()
                fetchConv()
            })
            .catch(err => console.log(err))

        // socket io
        socket.emit('new message', { message, user, receiverId })
    }

    // Auto scroll
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [conv])

    return (
        <div className='flex flex-col h-screen justify-between'>
            <header className='flex items-center fixed w-full bg-[#47555e] pb-2 h-14 border-b-4 border-[#38444b]'>
                <Link to={"/chat"}>
                    <button className='text-white pl-4'><i className="fas fa-chevron-left"></i></button>
                </Link>
                <h1 className='m-auto pr-16 text-white'>{name}</h1>
            </header>
            <main className='flex flex-col h-screen overflow-y-auto pb-14 mt-14'>
                {conv.length > 0 ? conv.map((message, index) => {

                    return <div ref={scrollRef} key={message._id}><Message message={message} key={message._id} /></div>
                })
                    : null
                }
            </main >
            <div className='block fixed inset-x-0 bottom-0 z-10'>
                <form onSubmit={(e) => sendMessage(e)} className='flex w-full items-center h-14 bg-[#47555e] border-t-4 border-[#38444b]'>
                    <input type="text" className='h-8 w-5/6 ml-2 placeholder pl-2 rounded-full' placeholder='Aa' onChange={(e) => setMessage({ ...message, "content": e.target.value })} />
                    <button type='submit' className='ml-4 text-white text-2xl'><i className="fas fa-paper-plane"></i></button>
                </form>
            </div>

        </div >
    );
}
