import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Avatar from './Avatar';

export default function Header({ page }) {
    // User firstname / Cookies / Navigate
    const [firstname, setFirstname] = useState([])
    const [cookies, setCookie, removeCookie] = useCookies(['userId']);
    const navigate = useNavigate()

    // Navigate to user profil
    function user() {
        navigate("/app/user")
    }

    // Fetch user info
    useEffect(() => {
        axios.get(`/api/users/${cookies.userId}`)
            .then(res => {
                setFirstname(res.data.firstname[1]);
            })
            .catch(err => navigate("/app/login") + alert("You need to login first"))
    }, []);

    return (
        <header className='flex items-center fixed w-full bg-[#202c33] pb-2 h-14 border-b-2 border-[#111b21]'>
            <button className='flex justify-center items-center  rounded-full w-10 h-10 mt-3 ml-3 bg-white active:border-2 active:border-[#38444b] text-4xl text-[#38444b]' onClick={() => user()}>
                {Avatar(firstname)}
            </button>
            <h1 className='text-xl text-white m-auto pr-12'>{page}</h1>
        </header>
    );
}