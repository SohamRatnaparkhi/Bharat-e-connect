import React from "react";
import "../globals.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Calendar from "./components/Calendar";

const ScheduleMeet = () => {
  return (
    <div className="flex justify-center w-screen h-screen">

       {/* -------------------------- public meet starts -------------------------- */}
       {/* <div className=" bg-black bg-opacity-90  w-screen h-screen z-20 absolute grid place-content-center">
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

      </div>  */}
      {/* ------------------------- public meet ends -------------------------- */}
        
      {/* -------------------------- private meet starts -------------------------- */}


          {/* -------------------Add Participants  - starts ------------------------------------ */}
        
          <div className="flex items-end  ">
        <div className=" bg-[#EDF2FE] border-4 border-blue-500 right-72 w-72 h-96 mb-8 rounded-lg z-40 absolute p-5">
          {/* <div className="w-10/12 h-7 rounded-md mt-2  pl-2 border-2 bg-white flex items-center">
              <p className="text-xs text-[#857F89]" >Search...</p>
              <input type="text" placeholder="Search..."  />
          </div> */}
          
          <div className="py-2 w-50 h-fit flex justify-center">
                  <TextField variant="outlined" type="text" fullWidth label="Search.."  size='small' name="meet-title " className="w-10/12"/>
          </div> 

          <div className=" w-full h-fit my-2 flex justify-between items-center border-2 rounded-l-full  ">
                    <div className="p-3 bg-[#cdb0ff] rounded-full absolute z-10">
                      RG
                    </div>
                    <div className="w-full py-3 rounded-l-full pl-14 pr-4 bg-white border-[#acacac] border-2 flex justify-between ">
                    <label for="mic" className="text-sm">Rakshanda Giri</label>
                    <input type="radio" id="mic"  name="mic" value="mic" className="w-5 h-5 "></input>
                    </div>
                    
          </div>


          <div className=" w-full h-fit my-2 flex justify-between items-center border-2 rounded-l-full  ">
                    <div className="p-3 bg-yellow-400 rounded-full absolute z-10">
                      RB
                    </div>
                    <div className="w-full py-3 rounded-l-full pl-14 pr-4 bg-white border-[#acacac] border-2 flex justify-between ">
                    <label for="mic" className="text-sm">Rishita Bura</label>
                    <input type="radio" id="mic"  name="mic" value="mic" className="w-5 h-5 "></input>
                    </div>
                    
          </div>
          
        </div>
        </div>
      
          {/* -------------------Add Participants  - ends ------------------------------------ */}

{/* ------------------------- Private meet continues-------- */}
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
                        <Button variant="outlined" component="label" className="m-0 " size="small"> Upload File <input type="file" hidden accept=".json,.csv" /> </Button>
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

      {/* -------------------------- private meet ends -------------------------- */}




        <div className="w-full h-full bg-white z-0 absolute blur-sm">
      <Navbar />
      <div className="flex flex-row w-full h-90% items-center justify-between">
        <Sidebar />
        <Calendar />
      </div>
      
    </div>
    
    </div>

//Original
//  <div >
 
//   <div className="w-screen h-screen bg-white">
// <Navbar />
// <div className="flex flex-row w-full h-90% items-center justify-between">
//   <Sidebar />
//   <Calendar />
// </div>

// </div>

// </div> 
    
  );
};

export default ScheduleMeet;
