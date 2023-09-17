"use client"

import React from 'react';
import {AiOutlineSearch} from 'react-icons';
// import Dropdown from '../components/dropdown'

const Navbar = () => {

    return (
        <div className="w-full h-10%">
            <div className='bg-primary-blue h-8'>
                {/* <div className='font-[400] text-white'>
                    Eng
                </div> */}
                

            </div>
            <div className="flex justify-between items-center h-full px-10 ">
                <div className="flex items-center text-black text-xl cursor-pointer">LOGO</div>

                <div className="flex items-center justify-around w-[30rem] bg-white cursor-pointer ">
                    <div className="flex items-center justify-evenly font-[600] text-black Montserrat hover:bg-light-blue rounded-xl hover:px-3 hover:p-3 hover:text-white">
                        Home
                    </div>
                    <div className="flex items-center justify-evenly font-[400] text-black Montserrat hover:bg-light-blue rounded-xl hover:px-3 hover:p-2 hover:text-white">
                        About Us
                    </div>
                    <div className="flex items-center justify-evenly font-[400] text-black Montserrat hover:bg-light-blue rounded-xl hover:px-3 hover:p-2 hover:text-white">
                        Services
                    </div>
                    {/* <button>
                        <AiOutlineSearch/>
                    </button> */}
                
                    {/* <button className="flex items-center justify-evenly text-black font-[600] text-sm border-2 border-white bg-gradient-to-r from-[#5D8BF4] from-50% via-[transparent] to-[#FFF] rounded-full p-2 w-40"
                        >
                       Connect wallet                     
                    </button> */}
                    <button className="flex items-center justify-evenly font-[600] text-white text-sm border-2 bg-light-blue rounded-xl p-3 w-40 hover:px-3 hover:p-4">
                       Connect to wallet                     
                    </button>

                </div>

            </div>
        </div>
    )
}

export default Navbar