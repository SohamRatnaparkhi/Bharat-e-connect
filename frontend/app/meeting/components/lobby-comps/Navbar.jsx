import React from 'react'
import Image from 'next/image'

const Navbar = () => {
  return (
    <div className="w-full h-15%">
        <div className="flex justify-between items-center h-full px-10">
          <div className="flex items-center flex-row justify-between h-full w-1/6 text-black text-xl">
            {/* <Image src="../../../public/logos/BharatConnect-logo.png" width={20} height={20} /> */}
            <div className='w-[66px] h-[66px] bg-aicte-logo'></div>
            <div className='w-[150px] h-[66px] bg-app-logo'></div>
          </div>

            <div className="flex items-center justify-around w-72 cursor-pointer ">
              <div className="flex items-center justify-evenly font-semi-bold text-light-blue text-sm border-2 border-black rounded-full p-1 w-40 hover:drop-shadow-[0_20px_20px_rgba(93, 139, 244, 1)]">
                <span className="text-xl">+</span> <span>Create Meet</span>
              </div>

              <div className="flex items-center">
                
              </div>
            </div>

        </div>
      </div>
  )
}

export default Navbar