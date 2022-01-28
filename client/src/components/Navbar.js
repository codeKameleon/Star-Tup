import React from 'react';
import '@fortawesome/fontawesome-free/js/all.js'
import { Link } from 'react-router-dom';

export default function Navbar({ page }) {
  return (
    <nav className='block fixed inset-x-0 bottom-0 z-10'>
      <div className='flex justify-around items-center h-14 bg-[#47555e] border-t-4 border-[#38444b]'>
        {page === "chat" ?
          <>
            <Link to="/chat">
              <button className='text-white hover:text-white'>
                <i className="far fa-comments text-3xl"></i>
              </button>
            </Link>
            <Link to="/contact">
              <button className='text-[#7aa5d2] hover:text-white'>
                <i className="fas fa-address-book text-3xl"></i>
              </button>
            </Link>
          </>
          :
          <>
            <Link to="/chat">
              <button className='text-[#7aa5d2] hover:text-white'>
                <i className="far fa-comments text-3xl"></i>
              </button>
            </Link>
            <Link to="/contact">
              <button className='text-white hover:text-white'>
                <i className="fas fa-address-book text-3xl"></i>
              </button>
            </Link>
          </>}

      </div>
    </nav >
  );
}