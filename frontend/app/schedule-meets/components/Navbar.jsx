import React from 'react'

import UserIcon from "../../svg-icons/UserIcon";

const Navbar = () => {
  return (
    <div className="w-full h-10%">
        <div className="flex justify-between items-center h-full px-10">
          <div className="flex items-center text-black text-xl">LOGO</div>

            <div className="flex items-center justify-around w-72 bg-white cursor-pointer ">
              <div className="flex items-center justify-evenly font-semi-bold text-light-blue text-sm border-2 border-black rounded-full p-1 w-40 hover:drop-shadow-[0_20px_20px_rgba(93, 139, 244, 1)]">
                <span className="text-xl">+</span> <span>Create Meet</span>
              </div>

              <div className="flex items-center">
                <UserIcon />
              </div>
            </div>

        </div>
      </div>
  )
}

export default Navbar