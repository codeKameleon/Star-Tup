import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function User() {
    const [user, setUser] = useState([])
    const [cookies, setCookie, removeCookie] = useCookies(['jwt']);

    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${'http://localhost:' + process.env.PORT}/api/users/${cookies.jwt}`, { headers: { withCredentials: true } })
            .then(res => {
                setUser(res.data)
            })
            .catch(err => console.log(err))
    }, []);

    function logout() {
        axios.get(`${'http://localhost:' + process.env.PORT}/api/account/logout`, { headers: { withCredentials: true } })
            .then(res => {
                removeCookie('jwt')
                navigate("/")
            })
            .catch(err => console.log(err))
    }

    function date() {
        let date = new Date(user.birthdate).getDate()
        let month = new Date(user.birthdate).getMonth() + 1
        let year = new Date(user.birthdate).getFullYear()
        return date + "/" + month + "/" + year
    }

    return (
        <>
            <header>
                <Link to={"/chat"}>
                    <button className='px-5 py-4 text-white'><i className="fas fa-chevron-left"></i></button>
                </Link>
            </header>
            <main className='h-5/6 flex flex-col justify-center items-center'>
                <h1 className='text-2xl'>Account info</h1>
                <hr className='bg-black w-3/4 h-0.5 mt-4 mb-4' />
                <div>
                    <p>First name : {user.firstname}</p>
                    <p>Last name : {user.lastname}</p>
                    <p>Email : {user.email}</p>
                    <p>Birthdate : {!user.birthdate ? null : date()}</p>
                    <p>Motto : {user.motto === 'undefined' ? user.motto : "/"}</p>
                </div>
                <h1 className='text-2xl'>Update account info</h1>
                <hr className='bg-black w-3/4 h-0.5 mt-4 mb-4' />
                <div>
                    <p>Email :
                        <input type="text" placeholder='new email' className='' />
                    </p>
                    <p>Password :
                        <input type="text" placeholder='new password' />
                    </p>
                    <p>Motto :
                        <input type="text" placeholder='new motto' />
                    </p>
                </div>
                <button className='p-2 w-24 bg-[#7aa5d2] rounded-lg mt-12' onClick={() => logout()}>Log out</button>
            </main>
        </>
    );
}
