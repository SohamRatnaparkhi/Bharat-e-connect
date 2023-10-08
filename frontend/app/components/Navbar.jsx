"use client"

import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const Navbar = () => {

    return (
        <div className="w-full h-12%">
            <div className='bg-primary-blue h-8'>
            </div>
            <div className="flex justify-between items-center h-full px-10 ">
                <div className=" flex items-center justify-around cursor-pointer ">
                    < img src="img/aictelogo.svg" style={{ width: '66px', height: '66px' }} className='mx-2'/>
                    <img src="img/BharatConnect logo.svg" style={{ width: '150px', height: '90px' }} />
                </div>

                <div className="flex items-center justify-around w-[30rem] bg-white cursor-pointer ">
                    <div className="flex items-center justify-evenly font-[600] text-black Montserrat hover:bg-light-blue rounded-xl hover:px-3 hover:p-3 hover:text-white">
                        Home
                    </div>
                    <div className="flex items-center justify-evenly font-[400] text-black Montserrat hover:bg-light-blue rounded-xl hover:px-3 hover:p-2 hover:text-white">
                        About Us
                    </div>
                    <div className="flex items-center justify-evenly font   -[400] text-black Montserrat hover:bg-light-blue rounded-xl hover:px-3 hover:p-2 hover:text-white">
                        Services
                    </div>
                    <button className='hover:bg-light-blue rounded-xl hover:px-3 hover:p-3 hover:text-white'>
                        <AiOutlineSearch size={25} />
                    </button>
                    <button className="flex items-center justify-evenly font-[600] text-white text-sm border-2 bg-light-blue rounded-xl p-3 w-40 hover:px-3 hover:p-4"
                    >
                        <a href="/login">Login/Register</a>
                        
                    </button>

                </div>

            </div>
        </div>
    )
}

export default Navbar