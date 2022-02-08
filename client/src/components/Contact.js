import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Avatar from './Avatar';

export default function Contact() {
    // Conversation / Cookies / Navigate
    const [users, setUsers] = useState([])
    const [cookies] = useCookies(['userId']);
    const navigate = useNavigate()

    // Fetch all user
    useEffect(() => {
        axios.get(`http://localhost:9000/api/users`)
            .then(res => {
                console.log(res.data.users);
                setUsers(res.data.users)
            })
        // .catch(err => navigate("/app/login") + alert("You need to login first"))
    }, []);

    // Start selected user to chat list
    function startConv(e) {
        axios.post(`http://localhost:9000/api/conversations`, [e.target.id], { headers: { withCredentials: true }, credentials: 'same-origin' })
            .then(res => {
                navigate("/app/chat/" + res.data._id + "/" + e.target.name + "/" + e.target.id, { replace: true })
            })
            .catch(err => err.response.data.message === "Conversation already exists" ? navigate("/chat/") :
                console.log(err.response.data.message))
    }

    return (
        <>
            <Header page="Contacts" />
            <main className='flex flex-col py-16 items-center bg-[#111b21] md:col-auto w-full md:flex-row md:flex-wrap md:px-32'>
                {/* if there is atleast one user map */}
                {users.length > 0 ? users.map((user, index) => {
                    return (
                        <article key={user._id} id={user._id} className='flex py-4 w-96 justify-between items-center my-2 h-20 bg-[#202c33] px-4 rounded-lg md:mr-4 md:my-2'>
                            <div className='flex'>
                                <button className='w-12 h-12 rounded-full bg-white mr-4'>{Avatar(user.firstname[1])}</button>
                                <div id={user._id}>
                                    <h1 id={user._id} className='text-lg font-medium text-white'>{cookies.userId === user._id ? "Me" : user.firstname}</h1>
                                    <p id={user._id} className='text-sm text-slate-500 truncate'>{user.motto.length >= 20 ? user.motto.substring(0, 20) + "..." : user.motto}</p>
                                </div>
                            </div>
                            <div id={user._id}>
                                <button id={user._id} name={user.firstname} className='rounded-lg p-2 bg-[#7aa5d2] ' onClick={(e) => startConv(e)}>Send message</button>
                            </div>
                        </article>
                    );
                })
                    // show nothing if there isn't atleast one user
                    : null}
            </main>
            <Navbar page="contact" />
        </>
    );
}


