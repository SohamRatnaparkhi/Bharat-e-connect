import UserIcon from '@/app/svg-icons/UserIcon'
import React from 'react'

const Sidebar = () => {
  return (
    <div className='relative h-full w-1/5 flex flex-col justify-center cursor-pointer' >
        <div className='relative bg-[#EDF2FE] w-11/12 h-5/6 flex flex-col justify-between rounded-r-[30px] ' >
            <div className='relative h-3/5 flex flex-col justify-evenly items-center'>
                <div className='relative h-12 w-56 rounded-xl flex flex-row items-center justify-start p-6 font-mont text-black active:text-white hover:px-3 ease-in-out duration-300 active:bg-[#5D8BF4]'>Profile</div>
                <div className='relative h-12 w-56 rounded-xl flex flex-row items-center justify-start p-6 font-mont text-black active:text-white hover:px-3 ease-in-out duration-300 active:bg-[#5D8BF4]'>Meeting</div>
                <div className='relative h-12 w-56 rounded-xl flex flex-row items-center justify-start p-6 font-mont text-black active:text-white hover:px-3 ease-in-out duration-300 active:bg-[#5D8BF4]'>Phonebook</div>
                <div className='relative h-12 w-56 rounded-xl flex flex-row items-center justify-start p-6 font-mont text-black active:text-white hover:px-3 ease-in-out duration-300 active:bg-[#5D8BF4]'>Recordings</div>
                <div className='relative h-12 w-56 rounded-xl flex flex-row items-center justify-start p-6 font-mont text-black active:text-white hover:px-3 ease-in-out duration-300 active:bg-[#5D8BF4]'>Files</div>
            </div>

            <div className='relative h-1/4 flex flex-row items-center justify-start ml-10 text-black'>
                <UserIcon styles={{'width':'100px', 'height':'100px'}} />
                <div className='pl-3 font-mont text-xl'>
                    Logout
                </div>
            </div>

        </div>
    </div>
  )
}

export default Sidebar