import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function User() {
    const [user, setUser] = useState([])
    const [update, setUpdate] = useState({
        email: "",
        password: "",
        motto: ""
      })
    const [cookies, setCookie, removeCookie] = useCookies(['userId']);

    const navigate = useNavigate()

    function fetch() {
        axios.get(`api/users/${cookies.userId}`, { headers: { withCredentials: true } })
            .then(res => {
                setUser(res.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetch()
    }, []);

    function logout() {
        axios.get("/api/account/logout", { headers: { withCredentials: true } })
            .then(res => {
                removeCookie('userId')
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

    const handleSubmit = e => {
        e.preventDefault()
    
        axios.put(`/api/users/${cookies.userId}`, update)
          .then(res => {
              fetch()
          })
          .catch(err => console.log(err.response))
      }
    

    return (
        <>
            <header className='flex justify-between w-full h-16 items-center'>
                <Link to={"/chat"}>
                    <button className='px-5 py-4 text-white'><i className="fas fa-chevron-left"></i></button>
                </Link>
                <button className='p-2 w-24 bg-[#f32727] rounded-lg mr-4' onClick={() => logout()}>Log out</button>
            </header>

            <main className='h-5/6 flex flex-col justify-around items-center'>
                <div className='w-full flex flex-col justify-center'>
                    <div className='flex bg-[#202c33] w-11/12 h-12 justify-center items-center rounded-full m-auto mt-4'>
                        <h1 className='text-2xl text-white'>Account info</h1>
                    </div>
                    <div className='text-white mt-4 ml-14'>
                        <p>First name : {user.firstname}</p>
                        <p>Last name : {user.lastname}</p>
                        <p>Email : {user.email}</p>
                        <p>Birthdate : {!user.birthdate ? null : date()}</p>
                        <p>Motto : {user.motto === 'undefined' ? "" : user.motto}</p>
                    </div>
                </div>
                <div className='w-full flex flex-col items-center justify-center'>
                    <div className='flex bg-[#202c33] w-11/12 h-12 justify-center items-center rounded-full mt-4'>
                        <h1 className='text-2xl text-white'>Update info </h1>
                    </div>
                    <div className='flex flex-col mt-4 w-full justify-center'>
                        <label className='text-white ml-14 mb-2'>Email :</label>
                        <br />
                        <input type="email" placeholder='new email' className='w-3/4 h-8 rounded-full pl-4 m-auto mb-2' onChange={e => setUpdate({ ...update, email: e.target.value })}/>
                        
                        <label className='text-white ml-14 mb-2'>Password :</label>
                        <br />
                        <input type="password" placeholder='new password' className='w-3/4 h-8 rounded-full pl-4 m-auto mb-2' onChange={e => setUpdate({ ...update, password: e.target.value })}/>
                        
                        <label className='text-white ml-14 mb-2'>Motto :</label>
                        <br />
                        <input type="text" placeholder='new motto' className='w-3/4 h-8 rounded-full pl-4 m-auto mb-2' onChange={e => setUpdate({ ...update, motto: e.target.value })}/>
                        <button className='p-2 w-24 bg-[#7aa5d2] rounded-lg m-auto mt-8' onClick={(e) => handleSubmit(e)}>Update</button>
                    </div>
                </div>
            </main>
        </>
    );
}
