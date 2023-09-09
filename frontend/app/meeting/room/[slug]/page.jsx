"use client";

import React, { useEffect, useRef, useState } from 'react'
import {
  usePeers,
  useRoom,
  useAcl,
} from "@huddle01/react/hooks";
import Participants from '../../components/meeting/Participants';
import Controls from '../../components/meeting/Controls';
import Button from '@/app/components/Button';
import VideoScreen from '../../components/meeting/VideoScreen';
import { useRouter } from "next/navigation";
import { useAppUtils } from "@huddle01/react/app-utils";
import { useEventListener } from "@huddle01/react/hooks";
import { useMeStore } from '@/app/store/MeetingStore';

const Room = ({ params }) => {
  const { push } = useRouter();
  const { isRoomJoined, error, isLoading, roomId } = useRoom();
  const { peers } = usePeers();
  const [displayNameText, setDisplayNameText] = React.useState("");
  const { setDisplayName } = useAppUtils();
  const isHost = useMeStore(state => state.isHost);
  const myPeerId = useMeStore(state => state.myPeerId);

  const { changePeerRole } = useAcl();

  useEffect(() => {
    if (!isRoomJoined) {
      push(`/meeting/lobby/${params.slug}`);
      return;
    }
  }, []);
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';

  const URL = `${origin}/meeting/room/${params.slug}`;
  console.log(URL)

  useEffect(() => {
    if (isHost) {
      changePeerRole(myPeerId, "host");
    } else {
      changePeerRole(myPeerId, "listener");
    }
  }, [isHost]);

  useEventListener("room:peer-joined", ({ peerId, role }) => {
    alert("Guest joint the room");
  });
  useEventListener("room:me-left", () => {
    push("/meeting");
  });
  useEventListener("room:peer-left", ({ peerId }) => {
    alert("Guest left the room");
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {error}
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

          setDisplayName(displayNameText);
        }}
      >
        {`SET_DISPLAY_NAME`}
      </Button>
      <VideoScreen peers={peers} />
      <Controls URL={URL} />
      <Participants peers={peers} />
    </div>
  )
}

export default Room
