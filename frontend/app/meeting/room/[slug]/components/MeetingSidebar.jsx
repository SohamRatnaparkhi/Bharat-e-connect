import React from "react";

import { FiLogOut } from "react-icons/fi";
import { BiCaptions } from "react-icons/bi";
import {
  Screenshare,
  Recording,
  Emotes,
  Moreoptions,
  Chatoption,
  Captionsoption,
} from "@/app/svg-icons/MeetingOptions";

const MeetingSidebar = () => {
  return (
    <div className="absolute left-0 flex flex-col items-center justify-between w-5% h-full bg-slate-50 cursor-pointer">
      <div className="relative w-20 h-20 flex flex-col justify-center items-center text-2xl rotate-180 text-[#EE2A2A;]">
        <FiLogOut />
      </div>

      <div className="relative h-3/6 w-full flex flex-col items-center justify-evenly">
        <div className="flex items-center justify-center w-[44px] h-[44px] bg-white rounded-full border-[1px] border-[#848486] active:bg-[#5D8BF4] text-white">
          <Captionsoption />
        </div>
        <div className="flex items-center justify-center w-[44px] h-[44px] bg-white rounded-full border-[1px] border-[#848486] active:bg-[#5D8BF4] text-white">
          <Screenshare />
        </div>
        <div className="flex items-center justify-center w-[44px] h-[44px] bg-white rounded-full border-[1px] border-[#848486] active:bg-[#5D8BF4] text-white">
          <Chatoption />
        </div>
        <div className="flex items-center justify-center w-[44px] h-[44px] bg-white rounded-full border-[1px] border-[#848486] active:bg-[#5D8BF4] text-white">
          <Recording />
        </div>
        <div className="flex items-center justify-center w-[44px] h-[44px] bg-white rounded-full border-[1px] border-[#848486] active:bg-[#5D8BF4] text-white">
          <Emotes />
        </div>
        <div className="flex items-center justify-center w-[44px] h-[44px] bg-white rounded-full border-[1px] border-[#848486] active:bg-[#5D8BF4] text-white">
          <Moreoptions />
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-center gap-3 h-1/5 w-full ">
        <div className="relative h-[44px] w-[44px] rounded-full bg-black"></div>
        <div className="text-sm">Log out</div>
      </div>
    </div>
  );
};

export default MeetingSidebar;
