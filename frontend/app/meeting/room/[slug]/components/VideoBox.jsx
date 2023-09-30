import React from "react";

import { Audio, Video } from "@huddle01/react/components";
import { useHuddle01 } from "@huddle01/react";
import { useEventListener } from "@huddle01/react/hooks";

import { FiMicOff, FiMic } from "react-icons/fi";

import cn from "@/app/utils/cn";

const VideoBox = ({ index, videoRef, isAudioPlaying }) => {
  // let vw = window.innerWidth;
  // let vh = window.innerHeight;

  // let panelWidth = vw * (0.95);
  // let panelHeight = vh * (0.7);

  // let panelArea = panelWidth * panelHeight;

  // let i = 130, divideIn;

  // while(i*i <= panelArea){
  //     i += 50;
  //     divideIn = i;
  // }
  const { me } = useHuddle01();

  return (
    <div className="relative flex flex-4 m-1 items-center justify-center rounded-[8px] drop-shadow-xl border border-1 bg-[#708090] border-black">
      <div className="absolute left-2 bottom-2 flex items-center justify-center h-[18px] px-2 py-2 bg-[#3535358C] rounded-[5px] text-[10px] text-white">
        {me.displayName.split(",")[0]}
      </div>
      <div className={cn(isAudioPlaying? 'bg-sec-blue': 'bg-[#3535358C]' , "z-30 absolute right-2 top-2 w-[30px] h-[30px] flex items-center justify-center  rounded-full text-white")}>
        {isAudioPlaying ? <FiMic /> : <FiMicOff />}
      </div>
      {/* <div className="-z-10 absolute flex items-center justify-center left-1/2 top-1/2 rounded-full  w-48 h-48 text-6xl font-semibold bg-slate-400 -translate-x-1/2 -translate-y-1/2">
        {me.displayName.split(",")[0].split("")[0]}
        {me.displayName.split(",")[0].split("")[1]}
      </div> */}
      <video
        ref={videoRef}
        style={{ 'maxHeight': "100%", 'zIndex':'-3' }}
        autoPlay
        muted
      ></video>
    </div>
  );
};

export default VideoBox;
