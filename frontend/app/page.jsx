import Link from 'next/link'
import { HiOutlineArrowRight } from "react-icons/hi"
import Navbar from './components/Navbar';
import { meet } from './assests/img/meet.png'

export default function Home() {
  return (
    <div className="w-full h-full bg-white">
      <Navbar />

      {/* <Link href="/schedule"> Create meeting </Link> */}

      <div className="flex flex-row w-full h-screen " >
        <div className="relative  w-6/12 flex flex-col ">
          <div className='h-40 '>
          </div>
          <div className='h-80 items-center px-10'>
            {/* <div className='relative items-center justify-center text-transparent bg-gradient-to-r from-[sec-blue] via-transparent to-[slate-2] bg-clip-text font-bold text-4xl '> */}
            <div
              className='relative items-center justify-center font-bold text-4xl'
              style={{
                // background: 'linear-gradient(180deg, #2D31FA 0%, #04DFFC 50%)',
                background: 'linear-gradient(#2D31FA, #04DFFC)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Join the <br /> Future of<br /> Communication
            </div>
            <div className='relative items-center justify-center text-black text-2xl Montserrat'>
              Effortless Video Conferencing
            </div>
            <button className="flex items-center justify-between text-black font-[600] text-sm border border-solid border-black bg-gradient-to-r from-[#5D8BF4] from-20% via-[transparent] to-[#FFF] rounded-full m-3 p-4 px-8 space-x-2">
              <span>Schedule a meeting</span>
              <HiOutlineArrowRight size={20} />
            </button>


          </div>
          <div className='relative h-80'>
            <div className='absolute h-80 w-6/12 bg-sec-blue rounded-tr-[100%] shadow-md'>
              <div className=' absolute h-64 mt-16 mr-16  w-10/12 bg-sky-blue rounded-tr-[100%] bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#5D8BF4] from-1% via-[transparent] to-[#FFF]'>
              </div>
            </div>
          </div>

        </div>
        <div className='relative  w-6/12 flex flex-col'>
          <div className='w-40 h-40 bg-cover bg-center' style={{ backgroundImage: `url('../assests/img/meet.png')` }}>

          </div>
          {/* <img src={meet} className=' w-40 h-auto'></img> */}
        </div>
      </div>
    </div>
  )
} 