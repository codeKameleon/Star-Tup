import React from 'react';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function Message(message) {
    // Id & name of receiver / Cookies
    const { name } = useParams();
    const [cookies] = useCookies(['userId']);

    // Check if message is a image or gif
    function isImgLink(url) {
        if (typeof url !== 'string') {
            return false;
        }
        return (url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) !== null);
    }

    return (
        <div className='pb-2 mb-2'>
            {/* User messages */}
            {message.message.sender === cookies.userId ?
                <div className='flex flex-col items-end justify-end text-right w-full pr-2 break-words'>
                    <h1 className='pr-2 text-white'>Me :</h1>
                    {isImgLink(message.message.content) === false ?
                        <p className='max-w-xs p-2 pl-4 pr-4 bg-[#7aa5d2] rounded-xl mr-2'>{message.message.content}</p>
                        :
                        <img src={message.message.content} alt="gif" className='max-w-xs p-2 pl-4 pr-4 mr-2' />
                    }

                </div>
                :
                // Receiver messages
                <div className='flex flex-col items-start text-left w-full pl-2 text-white break-words'>
                    <h1 className='pl-2'>{name} :</h1>
                    {isImgLink(message.message.content) === false ?
                        <p className='max-w-xs p-2 pl-4 pr-4 bg-[#202c33] rounded-xl ml-2'>{message.message.content}</p>
                        :
                        <img src={message.message.content} alt="gif" className='max-w-xs p-2 pl-4 pr-4 ml-2' />
                    }

                </div>
            }
        </div>
    );
}
