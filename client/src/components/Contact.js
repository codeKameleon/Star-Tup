import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

export default function Contact() {
    const [users, setUsers] = useState([])
    const [userId, setUserId] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`/api/users`)
            .then(res => {
                setUsers(res.data.users)
                setUserId(res.data.authenticated_user._id)
            })
            .catch(err => navigate("/login") + alert("You need to login first"))
    }, []);

    function startConv(e) {
        axios.post(`/api/conversations`, [e.target.id], { headers: { withCredentials: true }, credentials: 'same-origin' })
            .then(res => {
                navigate("/chat/" + res.data._id + "/" + e.target.name + "/" + e.target.id, { replace: true })
            })
            .catch(err => console.log())
    }

    return (
        <>
            <Header page="Contacts" />
            <main className='bg-[#eceeee] flex flex-col py-16 items-center'>
                {users.length > 0 ? users.map((user, index) => {
                    return (
                        <article key={user._id} id={user._id} className='flex py-4 w-96 justify-between items-center my-2 h-20 bg-[#c7ccce] px-4 rounded-lg border-b-4 border-r-4 border-[#b5bbbe] border-l-2 border-t-2'>
                            <div id={user._id}>
                                <h1 id={user._id} className='text-lg font-medium text-slate-900'>{user.firstname}</h1>
                                <p id={user._id} className='text-sm text-slate-500 truncate'>{user.motto}</p>
                            </div>
                            <div id={user._id}>
                                <button id={user._id} name={user.firstname} className='rounded-lg p-2 bg-[#7aa5d2] border border-b-4 border-r-4 border-[#6d94bd] active:border' onClick={(e) => startConv(e)}>Send message</button>
                            </div>
                        </article>
                    );
                })
                    : null}
            </main>
            <Navbar page="contact" />
        </>
    );
}


