import Link from 'next/link'
import { HiOutlineArrowRight } from "react-icons/hi"
import Navbar from './components/Navbar';
import react from 'react';

export default function Home() {
  return (
    <div className="w-full h-full bg-white">
      <Navbar />

      {/* <Link href="/schedule"> Create meeting </Link> */}

      <div className="flex flex-row w-full " >
        <div className="relative  w-6/12 flex flex-col">
          <div className='h-40'>
          </div>
          <div className='h-80 items-center px-10'>
            {/* <div className='relative items-center justify-center text-transparent bg-gradient-to-r from-[sec-blue] via-transparent to-[slate-2] bg-clip-text font-bold text-4xl '> */}
            <div
              className='relative items-center justify-center font-bold text-4xl'
              style={{
                background: 'linear-gradient(180deg, #2D31FA 0%, #04DFFC 50%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Join the Future of Communication
            </div>
            <div className='relative items-center justify-center text-black text-2xl Montserrat '>
              Effortless Video Conferencing
            </div>

            <button className="flex items-center justify-between text-black font-[500] text-sm border-2 border-sec-blue rounded-full m-3 p-4 px-10 space-x-2
            hover:bg-light-blue hover:text-black hover:border-white">
              <span>Schedule a meeting</span>
              <HiOutlineArrowRight />
            </button>


          </div>
          <div className='relative h-80'>
            <div className='absolute h-80 w-6/12 bg-sec-blue rounded-tr-[100%] '>
              <div className=' absolute h-64 mt-16 mr-16  w-10/12 bg-sky-blue rounded-tr-[100%]'>
              </div>
            </div>
          </div>

        </div>
        <div className='relative  w-6/12 flex flex-col'>
        </div>
      </div>
    </div>
  )
}
