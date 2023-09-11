"use client";

import React, { useEffect, useRef, useState } from 'react'
import {
  usePeers,
  useRoom,
  useAcl,
  useHuddle01,
} from "@huddle01/react/hooks";
import Participants from '../../components/meeting/Participants';
import Controls from '../../components/meeting/Controls';
import Button from '@/app/components/Button';
import VideoScreen from '../../components/meeting/VideoScreen';
import { useRouter } from "next/navigation";
import { useAppUtils } from "@huddle01/react/app-utils";
import { useEventListener } from "@huddle01/react/hooks";
import { useMeStore, useMeetingStore } from '@/app/store/MeetingStore';

const Room = ({ params }) => {
  const { push } = useRouter();
  const { me } = useHuddle01();
  const { isRoomJoined, error, isLoading, roomId } = useRoom();
  const { peers } = usePeers();
  const [displayNameText, setDisplayNameText] = React.useState("");
  const { setDisplayName } = useAppUtils();
  const isHost = useMeStore(state => state.isHost);
  const myPeerId = useMeStore(state => state.myPeerId);
  const removePeer = useMeetingStore(state => state.removePeer);
  const updatePeerName = useMeetingStore(state => state.updatePeerName);
  const roomPeers = useMeetingStore(state => state.peers);
  const addPeer = useMeetingStore(state => state.addPeer);
  const myEthAddress = useMeStore(state => state.myEthAddress);

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
      changePeerRole(myPeerId, "speaker");
    }
  }, [isHost]);

  useEffect(() => {
    if (me.meId == "")
      return;
    console.log("use effect adds following data " + displayNameText + " " + myEthAddress + " " + isHost + " " + me.meId)
    removePeer(me.meId)
    addPeer({
      peerId: me.meId,
      displayName: displayNameText,
      address: myEthAddress,
      isHost: isHost,
    })
  }, []);
  console.log("room peers", roomPeers)
  useEventListener("room:peer-joined", ({ peerId, role }) => {
    addPeer({
      peerId: peerId,
      displayName: displayNameText,
      address: myEthAddress,
      isHost: isHost,
    })
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
    console.log("my name updated")
    updatePeerName(myPeerId, displayNameText);
  });
  useEventListener("room:peer-name-update", ({ peerId }) => {
    updatePeerName(peerId, displayNameText);
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
          console.log("set display name clicked with " + displayNameText + " " + myPeerId + "")
          updatePeerName(myPeerId, displayNameText);
          setDisplayName(displayNameText + "," + myEthAddress);
        }}
      >
        {`SET_DISPLAY_NAME`}
      </Button>
      <Participants peers={peers} />
      <VideoScreen peers={peers} />
      <Controls URL={URL} />
    </div>
  )
}

export default Room
