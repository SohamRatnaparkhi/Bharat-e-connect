import React from "react";

import { FiArrowDown } from "react-icons/fi";
import { SendMessage } from "@/app/svg-icons/MeetingOptions";
import cn from "@/app/utils/cn";

const ChatBox = ({ chatBox }) => {
  return (
    <div className={cn(chatBox ? "w-25%" : "0", "ease-in-out duration-300")}>
      {chatBox && (
        <div className="w-25% absolute flex flex-col items-center justify-center right-0 bottom-0 bg-white h-95% ease-in-out duration-300">
          <div className="relative flex flex-col items-center justify-between py-5 w-90% h-95% bg-[#5D8BF41C] rounded-[10px]">
            <div className="relative flex flex-row items-center justify-evenly w-90% h-10% rounded-[5px] bg-white cursor-pointer">
              <div className="flex items-center justify-center w-2/5 rounded-[5px] active:bg-[#5D8BF4] active:text-white h-80%">
                Participants
              </div>
              <div className="flex items-center justify-center w-2/5 rounded-[5px] active:bg-[#5D8BF4] active:text-white h-80%">
                Groups
              </div>
            </div>

            <div className="flex flex-col overflow-y-scroll w-90% h-75%">
              <div className=" w-full gap-3 min-h-full "></div>
            </div>

            <div className="relative flex flex-row items-center justify-evenly w-90% h-10% rounded-[5px] bg-white">
              <input
                type="text"
                placeholder="Type your message"
                className="w-3/5 h-80% p-3 rounded-[5px] active:text-white"
              />
              <div className="w-1/6 h-80% flex items-center justify-center text-lg cursor-pointer hover:text-[#5D8BF4] active:bg-slate-300 rounded-full ease-in-out duration-300">
                <FiArrowDown />
              </div>
              <div className="flex items-center justify-center w-1/6 h-80% bg-[#5D8BF4] rounded-[5px] cursor-pointer active:backdrop-opacity-50">
                <SendMessage />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
