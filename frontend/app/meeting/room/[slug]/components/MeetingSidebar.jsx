import React, { useEffect, useState } from "react";

import cn from "@/app/utils/cn";

import { FiLogOut } from "react-icons/fi";
import { BiCaptions } from "react-icons/bi";
import {
  Screenshare,
  Recording,
  Emotes,
  Moreoptions,
  Chatoption,
  Captionsoption,
  CaptionsoptionW,
  ChatoptionW,
  EmotesW,
  MoreoptionsW,
  RecordingW,
  ScreenshareW,
} from "@/app/svg-icons/MeetingOptions";

import { useRoom, useVideo, useAudio } from '@huddle01/react/hooks';
import Button from '@/app/components/Button';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useEventListener, useRecording } from '@huddle01/react/hooks';
import { useMeStore, useMeetingStore } from '@/app/store/MeetingStore';
import 'regenerator-runtime/runtime'


const MeetingSidebar = ({ chatBox, setChatBox, isRecording, setIsRecording, isScreenShareOn, setIsScreenShareOn }) => {

  const { push } = useRouter();
  const shareScreenRef = useRef(null);

  const [isAudioPlaying, setIsAudioPlaying] = React.useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);
  const { isStarting, inProgress, isStopping, data } = useRecording();
  const isMuteOnJoin = useMeetingStore(state => state.isMuteOnJoin);
  const isDisableVideoOnJoin = useMeetingStore(state => state.isDisableVideoOnJoin);
  const screenShareRef1 = useMeetingStore(state => state.screenShareRef1);
  const setShareScreenRef1 = useMeetingStore(state => state.setShareScreenRef1);
  var screenShareStream = null;
  
  var recorder;
  
  if(typeof RecordRTC_Extension === 'undefined') {
    recorder = null;
  } else {
    recorder = new RecordRTC_Extension();
  }
  
  const startRecording = async () => {
    try {
      if (recorder == undefined || recorder == null) {
        alert("RecordRTC chrome extension is either disabled or not installed. Install the extension to record the screen")
      } else {
        recorder.startRecording({
          enableScreen: true,
          enableMicrophone: true,
          enableSpeakers: true
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  const stopRecording = async () => {
    // console.log(recorder)
    recorder.stopRecording(function (blob, error) {
      console.log("blob", blob)
      console.log("error", error)
      recorder = null;
      if (blob == false) {
        alert("RecordRTC chrome extension is either disabled or not installed. Install the extension to record the screen")
        return;
      }
      const link = document.createElement('a');
      link.href = window.URL?.createObjectURL(blob);
      link.download = `recording-${+new Date()}.webm`;
      link.click();
    });
  }
  const enableShareScreen = async () => {
    try {
      screenShareStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      if (shareScreenRef.current && screenShareStream) {
        shareScreenRef.current.srcObject = screenShareStream;
        stopProducingVideo();
        stopProducingAudio();
        produceVideo(screenShareStream);
        produceAudio(screenShareStream);
        setShareScreenRef1(screenShareRef1);
        console.log(screenShareStream)
      }
    } catch (error) {
      console.log(error)
    }
  };
  const disableScreenShare = () => {
    let tracks = shareScreenRef.current.srcObject.getTracks();
    tracks.forEach((track) => track.stop());
    shareScreenRef.current.srcObject = null;
    stopProducingAudio();
    stopProducingVideo();
    if (isAudioOn) fetchAudioStream();
    if (isVideoOn) fetchVideoStream();
    screenShareStream = null;
  };
  useEffect(() => {
    console.log(isMuteOnJoin, isDisableVideoOnJoin)
    if (isMuteOnJoin) {
      stopAudioStream();
      setIsAudioPlaying(false)
    }
    if (isDisableVideoOnJoin) {
      stopVideoStream();
      setIsVideoPlaying(false)
    }
  }, []);
  useEffect(() => {
    if (shareScreenRef.current == null) {
      stopProducingAudio();
      stopProducingVideo();
      if (isAudioPlaying) fetchAudioStream();
      if (isVideoPlaying) fetchVideoStream();
    }
  }, [shareScreenRef.current])
  const {
    produceAudio,
    stopProducingAudio,
    stopAudioStream,
    fetchAudioStream,
    isAudioOn,

  } = useAudio();
  const {
    produceVideo,
    stopProducingVideo,
    stopVideoStream,
    fetchVideoStream,
    isVideoOn
  } = useVideo();
  const { leaveRoom, isLoading, roomId, error } = useRoom();

  console.log("isAudioOn", isAudioOn)
  console.log("isVideoOn", isVideoOn)
  if (isLoading) {
    return <div>Loading...</div>;
  }
  useEventListener("app:mic-on", (stream) => {
    if (stream) produceAudio(stream);
    else fetchAudioStream();
  });

  useEventListener("app:mic-off", () => {
    stopProducingAudio();
  });

  useEventListener("app:cam-on", (stream) => {
    if (stream) produceVideo(stream);
    else fetchVideoStream();
  });

  useEventListener("app:cam-off", () => {
    stopProducingVideo();
  });
  console.log("url in controls", URL)
  const handleRecordStart = async () => {
    console.log("url in function", URL)
    await startRecording();
  }

  return (
    <div className="absolute left-0 flex flex-col items-center justify-between w-5% h-full bg-slate-50 cursor-pointer">
      <div className="relative w-20 h-20 flex flex-col justify-center items-center text-2xl rotate-180 text-[#EE2A2A]">
        <FiLogOut />
      </div>

      <div className="relative h-3/6 w-full flex flex-col items-center justify-evenly">
        <div className={cn("flex items-center justify-center w-[44px] h-[44px] bg-white rounded-full border-[1px] border-[#848486] active:bg-[#5D8BF4] text-white")}>
          <Captionsoption />
        </div>
        <div
          onClick={() => {
            setIsScreenShareOn(!isScreenShareOn);
            if (!isScreenShareOn) {
              enableShareScreen();
            } else {
              disableScreenShare();
            }
          }}
          className={cn(isScreenShareOn ? "bg-[#5D8BF4] text-white" : "bg-white", "flex items-center justify-center w-[44px] h-[44px] rounded-full border-[1px] border-[#848486] active:bg-[#5D8BF4] text-white")}
        >
          {isScreenShareOn ? <ScreenshareW /> : <Screenshare />}
        </div>
        <div
          onClick={() => {
            setChatBox(!chatBox);
          }}
          className={cn(chatBox ? "bg-[#5D8BF4]" : "bg-white", "flex items-center justify-center w-[44px] h-[44px] rounded-full border-[1px] border-[#848486] active:bg-[#5D8BF4] text-white")}
        >
          {chatBox ? <ChatoptionW /> : <Chatoption />}
        </div>
        <div
          onClick={() => {
            setIsRecording(!isRecording);
            if (!isRecording) {
              startRecording();
            } else {
              stopRecording();
            }
          }}
          className={cn(isRecording ? "bg-[#5D8BF4]" : "bg-white", "flex items-center justify-center w-[44px] h-[44px] rounded-full border-[1px] border-[#848486] text-white")}
        >
          {isRecording ? <RecordingW /> : <Recording />}
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
        {/* <div className="text-sm">Log out</div> */}
      </div>
    </div>
  );
};

export default MeetingSidebar;
