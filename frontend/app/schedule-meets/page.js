import React from "react";
import "../globals.css";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const ScheduleMeet = () => {
  return (
    <div className="w-full h-full bg-white">
      <Navbar />
      <Sidebar />
    </div>
  );
};

export default ScheduleMeet;
