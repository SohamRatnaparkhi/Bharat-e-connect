import React from "react";
import "../globals.css";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Calendar from "./components/Calendar";

const ScheduleMeet = () => {
  return (
    <div className="w-full h-full bg-white">
      <Navbar />
      <div className="flex flex-row w-full h-90% items-center justify-between">
        <Sidebar />
        <Calendar />
      </div>
    </div>
  );
};

export default ScheduleMeet;
