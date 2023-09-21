import React from 'react'

import UserIcon from "../../svg-icons/UserIcon";
import Image from 'next/image'

const Navbar = () => {
  return (
    <div className="w-full h-10%">
        <div className="flex justify-between items-center h-full px-10">
          <div className="flex items-center text-black text-xl gap-8">
            <Image src='/logos/aicte-logo.png' width={50} height={50} />
            <Image src='/logos/BharatConnect-logo.png' width={100} height={80} />
    
          </div>

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