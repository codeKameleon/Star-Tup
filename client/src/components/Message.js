import React from 'react';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function Message(message) {
    const { id, name } = useParams();
    const [cookies, setCookie, removeCookie] = useCookies(['userId']);

    return (
        <div>
            {message.message.sender === cookies.userId ?
                <div className='flex flex-col items-end justify-end text-right w-full pr-2'>
                    <h1 className='pr-2'>Me :</h1>
                    <p className='max-w-xs p-2 bg-[#7aa5d2] rounded-xl mb-2 '>{message.message.content}</p>
                </div>
                :
                <div className='flex flex-col items-start text-left w-full pl-2'>
                    <h1 className='pl-2'>{name} :</h1>
                    <p className='max-w-xs p-2 bg-[#bfbfbf] rounded-xl mb-2'>{message.message.content}</p>
                </div>
            }

        </div>
    );
}
