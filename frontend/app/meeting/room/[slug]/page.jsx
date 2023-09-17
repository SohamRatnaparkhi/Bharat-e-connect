"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePeers, useRoom, useAcl, useHuddle01 } from "@huddle01/react/hooks";
import Participants from "../../components/meeting/Participants";
import Controls from "../../components/meeting/Controls";
import Button from "@/app/components/Button";
import VideoScreen from "../../components/meeting/VideoScreen";
import { useRouter } from "next/navigation";
import { useAppUtils } from "@huddle01/react/app-utils";
import { useEventListener } from "@huddle01/react/hooks";
import { useMeStore, useMeetingStore } from "@/app/store/MeetingStore";
import GroupChat from "../../components/meeting/GroupChat";
import Transcript from "../../components/meeting/Captions";
import "regenerator-runtime/runtime";
import Captions from "../../components/meeting/Captions";
import PrivateChat from "../../components/meeting/PrivateChat";
import { formatTime } from "../(utils)/TIme";


import MeetingSidebar from "./components/MeetingSidebar";
import { RecordingIndicator, SendMessage } from "@/app/svg-icons/MeetingOptions";
import { FiArrowDown, FiMicOff, FiPhoneOff, FiVideo, FiVideoOff } from "react-icons/fi";

const Room = ({ params }) => {
  const { push } = useRouter();
  const { me } = useHuddle01();
  const { isRoomJoined, error, isLoading, roomId } = useRoom();
  const { peers } = usePeers();
  const [displayNameText, setDisplayNameText] = React.useState("");
  const { setDisplayName } = useAppUtils();
  const isHost = useMeStore((state) => state.isHost);
  const myPeerId = useMeStore((state) => state.myPeerId);
  const displayName = useMeStore((state) => state.displayName);
  const removePeer = useMeetingStore((state) => state.removePeer);
  const updatePeerName = useMeetingStore((state) => state.updatePeerName);
  const roomPeers = useMeetingStore((state) => state.peers);
  const addPeer = useMeetingStore((state) => state.addPeer);
  const myEthAddress = useMeStore((state) => state.myEthAddress);
  const addRoomMessage = useMeetingStore((state) => state.addRoomMessage);

  const { changePeerRole } = useAcl();

  useEffect(() => {
    updatePeerName(myPeerId, displayName);
    setDisplayName(displayName + "," + myEthAddress);
  }, [displayName, myEthAddress]);

  console.log(`Display Name: ${displayName}`);

  useEffect(() => {
    if (!isRoomJoined) {
      push(`/meeting/lobby/${params.slug}`);
      return;
    }
  }, []);
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const URL = `${origin}/meeting/room/${params.slug}`;

  useEffect(() => {
    if (isHost) {
      changePeerRole(myPeerId, "host");
    }
  }, [isHost]);

  useEffect(() => {
    if (me.meId == "") return;
    removePeer(me.meId);
    addPeer({
      peerId: me.meId,
      displayName: displayNameText,
      address: myEthAddress,
      isHost: isHost,
    });
  }, []);
  console.log("room peers", roomPeers);
  useEventListener("room:peer-joined", ({ peerId, role }) => {
    addPeer({
      peerId: peerId,
      displayName: displayNameText,
      address: myEthAddress,
      isHost: isHost,
    });
    alert("Guest joint the room");
  });
  useEventListener("room:me-left", () => {
    removePeer(myPeerId);
    push("/meeting");
  });
  useEventListener("room:peer-left", ({ peerId }) => {
    removePeer(peerId);
    alert("Guest left the room");
  });
  useEventListener("room:me-name-update", () => {
    console.log("my name updated");
    updatePeerName(myPeerId, displayNameText);
  });
  useEventListener("room:peer-name-update", ({ peerId }) => {
    updatePeerName(peerId, displayNameText);
  });
  useEventListener("room:data-received", (data) => {
    console.log("data received");
    console.log(data);
    addRoomMessage({
      ...data.payload,
      recipient: me.meId,
      timeStamp: formatTime(new Date().getTime()),
    });
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex flex-col items-center h-screen w-screen">
        {/* Sidebar */}
        <MeetingSidebar />

        {/* Navbar */}
        <div className="absolute w-95% h-5% bg-white top-0 right-0"></div>

        {/* Videos Screen */}
        <div className="absolute flex flex-col items-center justify-evenly w-70% h-95% bottom-0 left-20 cursor-pointer">
          <div className="relative flex flex-row justify-between w-full h-10% bg-white">
            <div className="relative flex flex-row h-full w-2/6">
              <div className="relative h-full pl-2 pr-8 py-3 text-2xl font-semibold">
                Meeting Title
              </div>
              <div className="relative w-1/3 h-full flex flex-row justify-start items-center">
                <div className="relative flex flex-row items-center justify-evenly h-30% px-2 gap-2 font-semibold text-sm bg-[#D9D9D9] rounded-[5px]"><RecordingIndicator /> <div>00:00:00</div></div>
              </div>
            </div>

            <div className="flex flex-row items-center justify-evenly h-full w-3/5 ">
              <div className="px-1">Someone wants to join the meet:</div>
              <div className="flex flex-row items-center gap-3 justify-evenly">
                <div className="w-[25px] h-[25px] rounded-full bg-red-800 "></div>
                <div className="text-lg font-semibold">Prof. J.M Joshi</div>
              </div>
              <div className="flex flex-row items-center justify-evenly py-1 h-1/2 w-30% bg-white">
                <div className="flex items-center justify-center h-full w-2/5 active:bg-[#5D8BF4] rounded-[5px]  active:text-white text-sm font-semibold">Accept</div>
                <div className="flex items-center justify-center h-full w-2/5 active:bg-[#5D8BF4] rounded-[5px]  active:text-white text-sm font-semibold">Reject</div>
              </div>
            </div>
          </div>

          {/* Video blocks */}
          <div className="relative w-full h-80% border-t-1"></div>

          <div className="relative flex flex-row justify-center w-full h-10%">
            <div className="flex flex-row items-center justify-evenly h-full w-20% bg-white ">
              <div className="flex items-center justify-center h-[44px] w-[44px] rounded-full bg-[#3535358C] text-white">
                <FiVideoOff />
              </div>
              <div className="flex items-center justify-center h-[44px] w-[44px] rounded-full bg-[#3535358C] text-white">
                <FiPhoneOff />
              </div>
              <div className="flex items-center justify-center h-[44px] w-[44px] rounded-full bg-[#3535358C] text-white">
                <FiMicOff />
              </div>
            </div>
          </div>
        </div>

        {/* Chat */}
        <div className="absolute flex flex-col items-center justify-center right-0 bottom-0 bg-white w-25% h-95%">
          <div className="relative flex flex-col items-center justify-between py-5 w-90% h-95% bg-[#5D8BF41C] rounded-[10px]">
            <div className="relative flex flex-row items-center justify-evenly w-90% h-10% rounded-[5px] bg-white cursor-pointer">
              <div className="flex items-center justify-center w-2/5 rounded-[5px] active:bg-[#5D8BF4] active:text-white h-80%">Participants</div>
              <div className="flex items-center justify-center w-2/5 rounded-[5px] active:bg-[#5D8BF4] active:text-white h-80%">Groups</div>
            </div>

            <div className="flex flex-col overflow-y-scroll w-90% h-75%">
              <div className=" w-full gap-3 min-h-full ">
                

              </div>
            </div>

            <div className="relative flex flex-row items-center justify-evenly w-90% h-10% rounded-[5px] bg-white">
              <input type="text" placeholder="Type your message" className="w-3/5 h-80% p-3 rounded-[5px] active:text-white" />
              <div className="w-1/6 h-80% flex items-center justify-center text-lg cursor-pointer"><FiArrowDown /></div>
              <div className="flex items-center justify-center w-1/6 h-80% bg-[#5D8BF4] rounded-[5px] cursor-pointer">
                <SendMessage />
              </div>
            </div>
          </div>

        </div>
      </div>

      {isHost && <h1>Host</h1>}
      <h2 className="text-2xl">Room {roomId}</h2>
      <input
        type="text"
        placeholder="Your display name"
        value={displayNameText}
        onChange={(e) => setDisplayNameText(e.target.value)}
        className="border-2 border-gray-300 text-black h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none mr-2"
      />
      <Button
        disabled={!setDisplayName.isCallable}
        onClick={() => {
          console.log(
            "set display name clicked with " +
              displayNameText +
              " " +
              myPeerId +
              ""
          );
          // updatePeerName(myPeerId, displayNameText);
          // setDisplayName(displayNameText + "," + myEthAddress);
        }}
      >
        {`SET_DISPLAY_NAME`}
        {displayName}
      </Button>
      <Participants peers={peers} me={me} />
      <VideoScreen peers={peers} />
      <Captions />
      <Controls URL={URL} />
      <GroupChat />
      <PrivateChat peers={peers} me={me} />
    </div>
  );
};

export default Room;
