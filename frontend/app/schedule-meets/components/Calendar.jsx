import NextIcon from '@/app/svg-icons/NextIcon'
import PrevIcon from '@/app/svg-icons/PrevIcon'
import React from 'react'

const Calendar = () => {
  return (
    <div className='relative flex justify-end w-9/12 h-5/6'>
        <div className=' flex flex-col justify-between items-center rounded-l-[30px] bg-white w-full border-4 border-sky-blue'>
            <div className='flex flex-row justify-between items-center w-90% h-15% '>
                <div className='font-bold text-[#555] '>August 2023</div>
                <div className='flex flex-row w-10% items-center justify-around'>
                    <div className='relative'><PrevIcon /></div>
                    <div className='relative'><NextIcon /></div>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default Calendar