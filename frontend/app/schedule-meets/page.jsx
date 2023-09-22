import React from "react";
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

const ScheduleMeet = () => {
  return (
    <div className="flex justify-center w-screen h-screen">

      <PublicMeet/>           
          
      {/* -------------------Private Meet starts ------------------------------------ */}
          {/* <AddParticipants/> */}
          {/* <PrivateMeet/> */}
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
