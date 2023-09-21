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

import cn from "@/app/utils/cn";

import MeetingSidebar from "./components/MeetingSidebar";

import ChatBox from "./components/ChatBox";
import MeetingParticipants from "./components/MeeingParticipants";

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

  const [chatBox, setChatBox] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isScreenShareOn, setIsScreenShareOn] = React.useState(false);

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
    // alert("Guest joint the room");
  });
  useEventListener("room:me-left", () => {
    removePeer(myPeerId);
    push("/meeting");
  });
  useEventListener("room:peer-left", ({ peerId }) => {
    removePeer(peerId);
    // alert("Guest left the room");
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
    return (
      <div>
        <iframe src="https://lottie.host/?file=307fb28b-48a0-477a-8c49-a9ba66f14a79/clHpsh7QES.json"></iframe>
      </div>
    );
  }

  return (
    <div className=" h-screen w-screen overflow-hidden">
      <div className="flex flex-col items-center h-screen w-screen overflow-hidden">
        {/* Sidebar */}
        <MeetingSidebar
          chatBox={chatBox}
          setChatBox={setChatBox}
          isRecording={isRecording}
          setIsRecording={setIsRecording}
          isScreenShareOn={isScreenShareOn}
          setIsScreenShareOn={setIsScreenShareOn}
        />

        {/* Navbar */}
        <div className="absolute w-95% h-5% bg-white top-0 right-0"></div>

        {/* Videos Screen */}
        <MeetingParticipants
          peers={peers}
          chatBox={chatBox}
          isRecording={isRecording}
          displayName={displayName}
          isScreenShareOn={isScreenShareOn}
        />

        {/* Chat */}
        <ChatBox chatBox={chatBox} peers={peers} />
      </div>

      {/* {isHost && <h1>Host</h1>}
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
      <PrivateChat peers={peers} me={me} /> */}
    </div>
  );
};

export default Room;
