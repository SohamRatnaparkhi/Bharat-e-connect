import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const PrivateMeet = () => {
  return (

    <div className=" bg-black bg-opacity-90  w-screen h-screen z-20 absolute grid place-content-center">
        <div className="  bg-white p-10 rounded-lg">

                  <div className="text-xl font-medium pb-7"><span className="text-[#5D8BF4]" >Private</span> Meeting</div>

                  <div className="py-2 w-80">
                  <TextField variant="outlined" type="text" fullWidth label="Meeting Title" required size='small' name="meet-title"/>
                  </div> 
                 
                  <div className="py-2 ">                  
                  <TextField variant="outlined" type="text" fullWidth label="Meeting Description"  size='small' name="meet-desc"/>
                  </div>

                  <div className="py-2 ">                  
                  <TextField variant="outlined" type="date" fullWidth   size='small' name="date"/>
                  </div>

                  <div className="py-2 flex justify-between">                  
                  <TextField type="time" className="w-5/12"  size='small' name="date"/>
                  <img src="arrow-right.svg" width={30} />
                  <TextField variant="outlined" type="time" className="w-5/12"  size='small' name="date"/>
                  </div>

                  <div className="py-2 flex justify-between items-center ">                  
                        <label>Add Participants</label>
                      <div className=" flex gap-3">
                        <Button variant="outlined" component="label" className="m-0 " size="small"> Choose File <input type="file" hidden accept=".json,.csv" /> </Button>
                        <img src="plus-square.svg" width={30} />
                      </div>                  
                  </div>

                  <div className="py-2 ">                  
                  
                  </div>

                  <div className="py-2 w-80  flex justify-between items-center ">
                    <label for="mic" className="text-sm">Mute participants' on entry </label>
                    <input type="checkbox" id="mic"  name="mic" value="mic" className="w-5 h-5 "></input>
                  </div>

                  <div className="py-2 w-80  flex justify-between items-center ">
                    <label for="video" className="text-sm">Disable participants' video on entry </label>
                    <input type="checkbox" id="video"  name="video" value="video" className="w-5 h-5 "></input>
                  </div>
                  
                  <div className="py-2 mt-2">
                  <TextField variant="outlined" className="bg-[#f5f5f5]" disabled type="text" fullWidth label="Meet ID" value={'dksf-dsf-kn'} size='small' name="meet-id" />
                  </div>


                  <div className="w-full gap-3 mt-9  flex justify-center">
                    <button type="button" className="p-2 w-5/12 rounded-lg border-2 bg-[#7E7E7E] bg-opacity-50 text-black">Cancel</button>
                    <button type="button" className="p-2 w-7/12 rounded-lg border-2 bg-[#5D8BF4] text-white">Create Meeting</button>
                  </div>
                  
                  <div className="w-full mt-7 flex justify-center text-sm">
                    Want to create  <a href='./signup' className="text-[#98BCF4] "> &nbsp; Public meeting ?</a>
                  </div>
        </div>

      </div> 
  
  )
}

export default PrivateMeet