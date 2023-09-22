import React from 'react'
import TextField from '@mui/material/TextField';

const PublicMeet = () => {
  return (
    <div className=" bg-black bg-opacity-90  w-screen h-screen z-20 absolute grid place-content-center">
    <div className="  bg-white p-10 rounded-lg">

              <div className="text-xl font-medium pb-7"><span className="text-[#5D8BF4]" >Public</span> Meeting</div>

              <div className="py-3 w-80">
              <TextField variant="outlined" type="text" fullWidth label="Meeting Title" required size='small' name="meet-title"/>
              </div> 
             
              <div className="py-3 ">
              <TextField variant="outlined" type="text" fullWidth label="Meeting Description"  size='small' name="meet-desc"/>
              </div>

              <div className="py-3 ">
              <TextField variant="outlined" className="bg-[#f5f5f5]" disabled type="text" fullWidth label="Meet ID" value={'dksf-dsf-kn'} size='small' name="meet-id" />
              </div>


              <div className="w-full gap-3 mt-9  flex justify-center">
                <button type="button" className="p-2 w-5/12 rounded-lg border-2 bg-[#7E7E7E] bg-opacity-50 text-black">Cancel</button>
                <button type="button" className="p-2 w-7/12 rounded-lg border-2 bg-[#5D8BF4] text-white">Create Meeting</button>
              </div>
              
              <div className="w-full mt-7 flex justify-center text-sm">
                Want to create  <a href='./signup' className="text-[#98BCF4] "> &nbsp; Private meeting ?</a>
              </div>
    </div>

  </div> 
  )
}

export default PublicMeet