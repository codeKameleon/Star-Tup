import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Notfound() {
    const navigate = useNavigate()
    function goBack(e) {
        e.preventDefault()
        navigate(-1)
    }
    return (
        <div className='flex justify-center items-center h-screen flex-col'>
            <h1 className='text-3xl text-red-600'>ERROR 404 : Page Not Found</h1>
            <p className='text-xl text-red-600'>Go back to previous page : <button className='bg-[#444444] w-24 h-12 rounded-full' onClick={(e) => goBack(e)}>CLICK ME</button></p>
        </div>
    );
}
