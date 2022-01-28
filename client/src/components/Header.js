import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header({ page }) {
    const navigate = useNavigate()

    function user() {
        navigate("/user")
    }
    return (
        <header className='flex items-center fixed w-full bg-[#47555e] pb-2 h-14 border-b-4 border-[#38444b]'>
            <button className='flex justify-center items-center  rounded-full w-10 h-10 mt-3 ml-3 bg-[#7aa5d2] active:border-2 active:border-[#38444b] text-4xl text-[#38444b]' onClick={() => user()}>
                <i className="fas fa-user-circle"></i>
            </button>
            <h1 className='text-xl text-white m-auto pr-8'>{page}</h1>
        </header>
    );
}