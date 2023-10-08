"use client"

import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

import Link from 'next/link';

const Navbar = () => {

    return (
        <div className="w-full h-12%">
            <div className='bg-primary-blue h-8'>
            </div>
            <div className="flex justify-between items-center h-full px-10 ">
                <div className=" flex items-center justify-around cursor-pointer ">
                    < img src="img/aictelogo.svg" style={{ width: '100px', height: '100px' }} className='mx-2'/>
                    <img src="img/Bharat_e_connect-logo.jpeg" style={{ width: '150px', height: '80px' }} />
                </div>

                <div className="flex items-center justify-around w-[30rem] bg-white cursor-pointer ">
                    <div className="flex items-center justify-evenly font-[600] text-black Montserrat hover:bg-light-blue rounded-xl hover:px-3 hover:p-3 hover:text-white ease-in-out duration-300">
                        Home
                    </div>
                    <div className="flex items-center justify-evenly font-[400] text-black Montserrat hover:bg-light-blue rounded-xl hover:px-3 hover:p-2 hover:text-white ease-in-out duration-300">
                        About Us
                    </div>
                    <div className="flex items-center justify-evenly font-[400] text-black Montserrat hover:bg-light-blue rounded-xl hover:px-3 hover:p-2 hover:text-white ease-in-out duration-300">
                        Services
                    </div>
                    <button className='hover:bg-light-blue rounded-xl hover:px-3 hover:p-3 hover:text-white ease-in-out duration-300'>
                        <AiOutlineSearch size={25} />
                    </button>

                    <Link href="/login">
                    <button className="flex items-center justify-evenly font-[600] text-white text-sm border-2 bg-light-blue rounded-xl p-3 w-40 hover:px-3 hover:p-4 ease-in-out duration-300">
                        Login/Sign up
                    </button>
                    </Link>

                </div>

            </div>
        </div>
    )
}

export default Navbar