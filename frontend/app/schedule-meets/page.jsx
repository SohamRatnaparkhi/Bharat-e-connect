'use client'
import React, {useState} from "react";
import "../globals.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Calendar from "./components/Calendar";
import PublicMeet from "./components/PublicMeet";
import PrivateMeet from "./components/PrivateMeet";
import AddParticipants from "./components/AddParticipants";
import cn from "../utils/cn";

const ScheduleMeet = () => {

  const [scheduleMeet, setScheduleMeet] = React.useState(false);
  const [meetType, setMeetType] = React.useState("public");
  

  return (
    <div className="flex justify-center w-screen h-screen">

      {scheduleMeet && meetType==="public" && <PublicMeet setScheduleMeet={setScheduleMeet} setMeetType={setMeetType} />    }       
          
      {/* -------------------Private Meet starts ------------------------------------ */}
          {/* <AddParticipants/> */}
         {meetType==="private" && scheduleMeet && <PrivateMeet setMeetType={setMeetType} setScheduleMeet={setScheduleMeet} />}
      {/* -------------------------- private meet ends -------------------------- */}


        <div className={cn(scheduleMeet ? "z-0 absolute blur-sm" : "blur-0" ,"w-full h-full bg-white")}>
      <Navbar scheduleMeet={scheduleMeet} setScheduleMeet={setScheduleMeet} />
      <div className="flex flex-row w-full h-90% items-center justify-between">
        <Sidebar />
        <Calendar scheduleMeet={scheduleMeet} />
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
