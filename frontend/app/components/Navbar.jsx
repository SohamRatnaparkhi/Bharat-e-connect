import React from 'react';


const Navbar = () => {

    return (
        <div className="w-full h-10%">
            <div className="flex justify-between items-center h-full px-10 ">
                <div className="flex items-center text-black text-xl cursor-pointer">LOGO</div>

                <div className="flex items-center justify-around w-[30rem] bg-white cursor-pointer ">
                    <div className="flex items-center justify-evenly font-[600] text-black Montserrat hover:bg-light-blue rounded-xl hover:px-3 hover:p-3">
                        Home
                    </div>
                    <div className="flex items-center justify-evenly font-[400] text-black Montserrat hover:bg-light-blue rounded-xl hover:px-3 hover:p-2">
                        About Us
                    </div>
                    <button className="flex items-center justify-evenly text-black font-[600] text-sm border-2 border-white bg-gradient-to-r from-[#5D8BF4] via-[transparent] to-[#FFF] rounded-full p-2 w-40"
                        >
                       Connect wallet                     
                    </button>

                </div>

            </div>
        </div>
    )
}

export default Navbar