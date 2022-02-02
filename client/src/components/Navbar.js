import React from 'react';
import '@fortawesome/fontawesome-free/js/all.js'
import { Link } from 'react-router-dom';

export default function Navbar({ page }) {
  return (
    <nav className='block fixed inset-x-0 bottom-0 z-10'>
      <div className='flex justify-around items-center h-14 bg-[#202c33] border-t-4 border-[#111b21]'>
        {/* Change button color on chat & contact page */}
        {page === "chat" ?
          <>
            <Link to="/app/chat">
              <button className='text-white hover:text-white'>
                <i className="fas fa-comments text-3xl"></i>
              </button>
            </Link>
            <Link to="/app/contact">
              <button className='text-[#7aa5d2] hover:text-white'>
                <i className="fas fa-address-book text-3xl"></i>
              </button>
            </Link>
          </>
          :
          <>
            <Link to="/app/chat">
              <button className='text-[#7aa5d2] hover:text-white'>
                <i className="fas fa-comments text-3xl"></i>
              </button>
            </Link>
            <Link to="/app/contact">
              <button className='text-white hover:text-white'>
                <i className="fas fa-address-book text-3xl"></i>
              </button>
            </Link>
          </>}

      </div>
    </nav >
  );
}