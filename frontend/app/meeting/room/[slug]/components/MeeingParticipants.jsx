import React, { useEffect } from "react";

import { Audio, Video } from "@huddle01/react/components";
import { useHuddle01 } from "@huddle01/react";
// import { useEventListener } from '@huddle01/react/hooks';
import { useRoom, useVideo, useAudio } from "@huddle01/react/hooks";
// import Button from '@/app/components/Button';
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useEventListener, useRecording } from "@huddle01/react/hooks";
import { useMeStore, useMeetingStore } from "@/app/store/MeetingStore";
import "regenerator-runtime/runtime";

import {
  FiMic,
  FiMicOff,
  FiPhone,
  FiPhoneOff,
  FiTv,
  FiVideo,
  FiVideoOff,
  FiXSquare,
} from "react-icons/fi";
import { RecordingIndicator } from "@/app/svg-icons/MeetingOptions";
import cn from "@/app/utils/cn";
import VideoBox from "./VideoBox";
// import { is } from "core-js/core/object";
import { useAppUtils } from "@huddle01/react/app-utils";


const MeetingParticipants = ({ chatBox, isRecording, peers, displayName }) => {
  // console.log(peers)
  const { me } = useHuddle01();
  const videoRef = useRef();
  const [isScreenShareOn, setIsScreenShareOn] = React.useState(false);
  const [screenSharingPeerId, setScreenSharingPeerId] = React.useState(null);
  const [screenSharingPeer, setScreenSharingPeer] = React.useState(null);
  useEventListener("app:cam-on", (camStream) => {
    if (camStream && videoRef.current) {
      videoRef.current.srcObject = camStream;
    }
  });
  useEventListener("app:cam-off", () => {
    videoRef.current.srcObject = null;
  });
  useEventListener("room:data-received", (data) => {
    if (data.payload.kind != "screen-share") {
      return;
    }
    const { message } = data.payload;
    if (message == "screen-share-started") {
      setScreenSharingPeerId(data.payload.senderId);
      alert("screen share started by " + screenSharingPeerId)
      console.log(peers)
      setScreenSharingPeer(peers[screenSharingPeerId])
      console.log(screenSharingPeerId)
    } else if (message == "screen-share-stopped") {
      setScreenSharingPeerId(null);
    }
    // alert(JSON.stringify(JSON.stringify(message)));
  })

  const { sendData } = useAppUtils();
  const { push } = useRouter();
  let shareScreenRef = useRef(null);
  const [isAudioPlaying, setIsAudioPlaying] = React.useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);
  // const [currentShareScreenRef, setCurrentShareScreenRef] = React.useState(null);

  const { isStarting, inProgress, isStopping, data } = useRecording();
  const isMuteOnJoin = useMeetingStore((state) => state.isMuteOnJoin);
  const isDisableVideoOnJoin = useMeetingStore(
    (state) => state.isDisableVideoOnJoin
  );
  const shareScreenRef1 = useMeetingStore((state) => state.shareScreenRef1);

  // const recorder = new RecordRTC_Extension();
  var screenShareStream = null;
  const startRecording = async () => {
    if (!recorder) {
      alert(
        "RecordRTC chrome extension is either disabled or not installed. Install the extension to record the screen"
      );
    } else {
      recorder.startRecording({
        enableScreen: true,
        enableMicrophone: true,
        enableSpeakers: true,
      });
    }
  };
  const stopRecording = async () => {
    recorder.stopRecording(function (blob) {
      console.log("blob", blob);
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `recording-${+new Date()}.webm`;
      link.click();
    });
  };
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
        setIsScreenShareOn(true);
        sendData("*", {
          kind: "screen-share",
          message: "screen-share-started",
          senderId: me.meId
        })
      }
    } catch (error) {
      console.log(error);
    }
  };
  const disableScreenShare = () => {
    setIsScreenShareOn(false);

    // if(!shareScreenRef || !shareScreenRef.current) return; 

    let tracks = shareScreenRef.current.srcObject.getTracks();
    tracks.forEach((track) => track.stop());
    shareScreenRef.current.srcObject = null;
    stopProducingAudio();
    stopProducingVideo();
    if (isAudioOn) fetchAudioStream();
    if (isVideoOn) fetchVideoStream();
    screenShareStream = null;

    sendData("*", {
      kind: "screen-share",
      message: "screen-share-stopped",
      senderId: me.meId
    })
  };
  useEffect(() => {
    console.log(isMuteOnJoin, isDisableVideoOnJoin);
    if (isMuteOnJoin) {
      stopAudioStream();
      setIsAudioPlaying(false);
    }
    if (isDisableVideoOnJoin) {
      stopVideoStream();
      setIsVideoPlaying(false);
    }
  }, []);
  useEffect(() => {
    if (shareScreenRef.current == null) {
      stopProducingAudio();
      stopProducingVideo();
      if (isAudioPlaying) fetchAudioStream();
      if (isVideoPlaying) fetchVideoStream();
    }
  }, [shareScreenRef.current]);

  useEffect(() => {
    shareScreenRef = shareScreenRef1;
  }, [shareScreenRef1]);

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
    isVideoOn,
  } = useVideo();
  const { leaveRoom, isLoading, roomId, error } = useRoom();

  console.log("isAudioOn", isAudioOn);
  console.log("isVideoOn", isVideoOn);
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
  console.log("url in controls", URL);
  const handleRecordStart = async () => {
    console.log("url in function", URL);
    await startRecording(URL);
  };

  return (
    <div>
      {Object.values(peers)
        .filter((peer) => peer.mic)
        .map((peer) => (
          <>
            <Audio key={peer.peerId} peerId={peer.peerId} track={peer.mic} />
          </>
        ))}
      <div
        className={cn(
          chatBox ? "w-4/6" : "w-90%",
          "absolute flex flex-col items-center justify-evenly h-95% bottom-0 left-20 cursor-pointer ease-in-out duration-300 grid-cols-1 "
        )}
      >
        <div className="relative flex flex-row justify-between w-full h-10% bg-white">
          <div className="relative flex flex-row h-full w-2/6">
            <div className="relative h-full pl-2 pr-8 py-3 text-2xl font-semibold">
              Meeting Title
            </div>
            <div className="relative w-1/3 h-full flex flex-row justify-start items-center">
              {isRecording && (
                <div className="relative flex flex-row items-center justify-evenly h-30% px-2 gap-2 font-semibold text-sm bg-[#D9D9D9] rounded-[5px]">
                  <RecordingIndicator /> <div>00:00:00</div>
                </div>
              )}
            </div>
          </div>

          {/* New guest joins */}
          <div className="flex flex-row items-center justify-evenly h-full w-3/5 ">
            {/* <div className="px-1">Someone wants to join the meet:</div> */}
            <div className="flex flex-row items-center gap-3 justify-evenly">
              <div className="w-[25px] h-[25px] rounded-full bg-red-800 "></div>
              <div className="text-lg font-semibold">{me.displayName.split(',')[0]}</div>
            </div>
            {/* <div className="flex flex-row items-center justify-evenly py-1 h-1/2 w-30% bg-white">
              <div className="flex items-center justify-center h-full w-2/5 active:bg-[#5D8BF4] rounded-[5px]  active:text-white text-sm font-semibold">
                Accept
              </div>
              <div className="flex items-center justify-center h-full w-2/5 active:bg-[#5D8BF4] rounded-[5px]  active:text-white text-sm font-semibold">
                Reject
              </div>
            </div> */}
          </div>
        </div>

        {/* Video blocks */}
        <div className={cn(isScreenShareOn ? "overflow-x-scroll" : "overflow-hidden", "relative w-full h-80% max-h-80% border-t-1 flex justify-center flex-wrap gap-3 ease-in-out duration-300 ")}>
          <div className={cn(isScreenShareOn ? "w-full h-full" : "w-0 h-0")}>
            {shareScreenRef && <video
              ref={shareScreenRef}
              muted
              autoPlay
              style={{ width: "100%" }}
              className="bg-base-300"
            />}
          </div>
          {
            screenSharingPeerId != null && peers[screenSharingPeerId]?.cam && <Video
              className="h-full w-full"
              key={screenSharingPeerId}
              peerId={screenSharingPeerId}
              track={peers[screenSharingPeerId].cam}
            // debug
            />
          }
          {/* <video ref={videoRef} autoPlay muted></video> */}
          {/* {[...Array(7)].map((_, index) => <VideoBox index={index} />)} */}
          {Object.values(peers)
            // .filter((peer) => peer.cam)
            .map((peer) => (
              <div key={peer.peerId} className="relative flex flex-4 m-1 items-center justify-center rounded-[8px] drop-shadow-xl border border-1 bg-[#708090] border-black">
                <div className="absolute left-2 bottom-2 flex items-center justify-center h-[18px] px-2 py-2 bg-[#3535358C] rounded-[5px] text-[10px] text-white">
                  {peer.displayName?.split(",")?.[0]}{" "}
                </div>
                {!peer.cam && <div className="text-3xl">{peer.displayName?.split(",")?.[0].substring(0, 2)}</div>}


                <div className={cn(peer.mic ? 'bg-sec-blue': 'bg-[#3535358C] ', "absolute right-2 top-2 w-[30px] h-[30px] flex items-center justify-center rounded-full text-white")}>
                  {peer.mic ? <FiMic/>: <FiMicOff />}
                </div>

                {peer.cam && <Video
                  className="h-full max-h-full"
                  key={peer.peerId}
                  peerId={peer.peerId}
                  track={peer.cam}
                // debug
                />}

                {/* Role: {peer.role}, Name: {peer.displayName?.split(',')?.[0]} */}
              </div>
            ))}
          <VideoBox videoRef={videoRef} isAudioPlaying={isAudioPlaying} />
        </div>

        <div className="relative flex flex-row justify-center w-full h-10%">
          <div className="flex flex-row items-center justify-evenly h-full w-20%">
            <div
              onClick={() => {
                setIsVideoPlaying(!isVideoPlaying);
                isVideoOn ? stopVideoStream() : fetchVideoStream();
              }}
              className={cn(
                isVideoPlaying ? "bg-[#3535358C]" : "bg-[#EE2A2A]",
                "flex items-center justify-center h-[44px] w-[44px] rounded-full  text-white"
              )}
            >
              {isVideoPlaying ? <FiVideo /> : <FiVideoOff />}
            </div>
            <div
              onClick={() => {
                setIsAudioPlaying(!isAudioPlaying);
                isAudioPlaying ? stopAudioStream() : fetchAudioStream();
              }}
              className={cn(
                !isAudioPlaying ? "bg-[#EE2A2A]" : "bg-[#3535358C]",
                "flex items-center justify-center h-[44px] w-[44px] rounded-full text-white"
              )}
            >
              {isAudioPlaying ? <FiMic /> : <FiMicOff />}
            </div>
            <div
              onClick={() => {
                leaveRoom();
                push("/schedule-meets/");
              }}
              className={
                "flex items-center justify-center h-[44px] w-[44px] rounded-full bg-[#EE2A2A] hover:brightness-200 ease-in-out duration-200 text-white"
              }
            >
              <FiPhoneOff />
            </div>
            <div onClick={enableShareScreen} className="bg-[#EE2A2A] flex items-center justify-center h-[44px] w-[44px] rounded-full text-white">
              <FiTv />
            </div>
            <div onClick={disableScreenShare} className="bg-[#EE2A2A] flex items-center justify-center h-[44px] w-[44px] rounded-full text-white">
              <FiXSquare />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingParticipants;