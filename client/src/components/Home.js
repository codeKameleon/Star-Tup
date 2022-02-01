import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <main className='flex flex-col flex-auto items-center w-full h-screen'>
            <section>
                <img src="logo.png" alt="logo" className='w-3/4 m-auto mb-10' />

                <div className='flex flex-col items-start text-left w-full pl-2 text-white break-words'>
                    <h1 className='pl-2'>Star-Tup :</h1>
                    <p className='max-w-xs p-2 pl-4 pr-4 bg-[#202c33] rounded-xl ml-2'>Welcome to Star-Up Chat app</p>
                    <p className='max-w-xs p-2 pl-4 pr-4 bg-[#202c33] rounded-xl ml-2 mt-1'>It's not easy being an entrepreneur, <br /> why not ask the stars?</p>
                </div>
                <div className='flex flex-col items-end justify-end text-right w-full pr-2 break-words'>
                    <h1 className='pr-2 text-white'>Me :</h1>
                    <p className='max-w-xs p-2 pl-4 pr-4 bg-[#7aa5d2] rounded-xl mr-2'>Say no more I'm in !</p>
                </div>
            </section>

            <section className='flex flex-col w-80 justify-center mt-24'>
                <Link to="/login">
                    <button className='group relative w-full flex justify-center my-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#7aa5d2] hover:bg-[#6798cc] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                        Login
                    </button>
                </Link>

                <Link to="/register">
                    <button className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#7aa5d2] hover:bg-[#6798cc] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                        Register
                    </button>
                </Link>
            </section>
        </main>
    );
}