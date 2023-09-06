"use client";

import React, { useEffect, useRef, useState } from 'react'
import {
  useAudio,
  useLobby,
  usePeers,
  useRoom,
  useVideo,
} from "@huddle01/react/hooks";
import Participants from '../../components/meeting/Participants';
import Controls from '../../components/meeting/Controls';
import Button from '@/app/components/Button';
import VideoScreen from '../../components/meeting/VideoScreen';
import { useRouter } from "next/navigation";
import { useAppUtils } from "@huddle01/react/app-utils";
import { useEventListener } from "@huddle01/react/hooks";

const Room = ({ params }) => {
  const { isLobbyJoined } = useLobby();
  const { push } = useRouter();
  const { joinRoom, isRoomJoined, error, isLoading, roomId } = useRoom();
  const { fetchAudioStream, stopAudioStream } = useAudio();
  const { fetchVideoStream, stopVideoStream, stream: camStream } = useVideo();
  console.log(isLoading, isRoomJoined)
  const [displayNameText, setDisplayNameText] = React.useState("");
  const { setDisplayName } = useAppUtils();

  useEffect(() => {
    fetchVideoStream();
    fetchAudioStream();
  }, [])
  if (isLoading) {
    return <div>Loading...</div>;
  }
  useEventListener("room:peer-joined", ({ peerId, role }) => {
    if (role === "peer") {
      // changePeerRole(peerId, "listener");
      console.log("peer joined")
    }
  });
  useEventListener("room:me-left", () => {
    push("/meeting");
  });
  useEffect(() => {
    if (!isRoomJoined) {
      push(`/meeting/lobby/${params.slug}`);
      return;
    }
  }, []);

  const { peers } = usePeers();

  console.log(roomId)
  return (
    <div>
      {error}
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
      <Controls />
      <Participants peers={peers} />
    </div>
  )
}

export default Room
