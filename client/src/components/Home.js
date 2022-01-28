import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <main className='flex flex-col flex-auto items-center w-full h-screen bg-[#47555e]'>
            <section>
                <img src="logo.png" alt="logo" className='w-3/4 m-auto mb-10' />
                <h1 className='text-center text-white'>Welcome to Star-Up Chat app</h1>
                <br />
                <h2 className='text-center text-white'>It's not easy being an entrepreneur, <br /> why not ask the stars?</h2>
            </section>

            <section className='flex flex-col w-80 justify-center mt-24'>
                <Link to="/login">
                    <button className='group relative w-full flex justify-center my-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#7aa5d2] hover:bg-[#6798cc] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                        Login
                    </button>
                </Link>

                <Link to="/register">
                    <button className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#7aa5d2] hover:bg-[#6798cc] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                        register
                    </button>
                </Link>
            </section>
        </main>
    );
}