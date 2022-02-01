import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function Header({ page }) {
    const [firstname, setFirstname] = useState([])
    const [cookies, setCookie, removeCookie] = useCookies(['userId']);
    const navigate = useNavigate()

    function user() {
        navigate("/user")
    }

    useEffect(() => {
        axios.get(`http://localhost:9000/api/users/${cookies.userId}`)
            .then(res => {
                console.log(res.data.firstname[1]);
            })
            .catch(err => navigate("/login") + alert("You need to login first"))
    }, []);

    return (
        <header className='flex items-center fixed w-full bg-[#202c33] pb-2 h-14 border-b-2 border-[#111b21]'>
            <button className='flex justify-center items-center  rounded-full w-10 h-10 mt-3 ml-3 bg-[#7aa5d2] active:border-2 active:border-[#38444b] text-4xl text-[#38444b]' onClick={() => user()}>
                <i className="fas fa-user-circle"></i>
            </button>
            <h1 className='text-xl text-white m-auto pr-12'>{page}</h1>
        </header>
    );
}