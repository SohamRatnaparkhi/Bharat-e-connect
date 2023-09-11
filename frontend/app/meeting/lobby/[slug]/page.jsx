"use client";

import Button from '@/app/components/Button';
import { checkSBTBalance, getWalletDetails } from '@/app/hooks/Web3';
import {
  useAudio,
  useLobby,
  usePeers,
  useRoom,
  useVideo,
  useEventListener,
} from "@huddle01/react/hooks";
import { useAppUtils } from "@huddle01/react/app-utils";
import { useHuddle01 } from "@huddle01/react";
import React from 'react'
import { useEffect, useRef } from 'react';
import Controls from '../../components/meeting/Controls';
import VideoScreen from '../../components/meeting/VideoScreen';
import Participants from '../../components/meeting/Participants';
import { useRouter } from "next/navigation";
import { getMeeting } from '@/app/hooks/MeetApiCalls';
import { useMeetingStore, useMeStore } from '@/app/store/MeetingStore';

const MeetLobby = ({ params }) => {

  const videoRef = useRef();
  const [peerAddress, setPeerAddress] = React.useState(null);
  const { push } = useRouter();
  const [isPeerHost, setIsPeerHost] = React.useState(false);

  const { initialize, me } = useHuddle01();
  const { isRoomJoined } = useRoom();
  const { peers } = usePeers();
  const { joinLobby, leaveLobby, isLoading, isLobbyJoined } = useLobby();
  const [accessDenied, setAccessDenied] = React.useState(false);

  const {
    fetchAudioStream,
    stopAudioStream,
  } = useAudio();
  const {
    fetchVideoStream,
    stopVideoStream,
    error,
  } = useVideo();
  const { joinRoom } = useRoom();
  // const { setDisplayName } = useAppUtils();

  const [displayNameText, setDisplayNameText] = React.useState("");

  const addHostAddress = useMeetingStore(state => state.addHostAddress);
  const setIsHost = useMeStore(state => state.setIsHost);
  const setDisplayName = useMeStore(state => state.setDisplayName);
  const setMuteOnJoin = useMeetingStore(state => state.setMuteOnJoin);
  const setDisableVideoOnJoin = useMeetingStore(state => state.setDisableVideoOnJoin);
  const setMyPeerId = useMeStore(state => state.setMyPeerId);
  const roomId = useMeetingStore(state => state.roomId);
  const setRoomId = useMeetingStore(state => state.setRoomId);
  const setMyEthAddress = useMeStore(state => state.setMyEthAddress);

  useEffect(() => {
    const setPeerEthAddress = async () => {
      var { address } = await getWalletDetails();
      if (address)
        setPeerAddress(address);
      console.log(address)
    };
    setPeerEthAddress();
  }, [peerAddress]);

  const pushPeerToLobby = () => {
    if (isPeerHost) {
      setIsHost(true);
      addHostAddress(peerAddress);
    }
    if (!isLobbyJoined) {
      initialize(process.env.NEXT_PUBLIC_PROJECT_ID ?? "");
      joinLobby(params.slug);
      return;
    }
  }

  const checkLobbyConditions = async () => {
    var { address } = await getWalletDetails();
    setMyEthAddress(address);
    setPeerAddress(address);
    const meetDetails = await getMeeting(params.slug);
    console.log(meetDetails)
    const meet = meetDetails.data?.data;
    setRoomId(meet.roomId);
    console.log(meet.hostAddresses, address)
    if (meet?.meetConfig.audioDisabled)
      setMuteOnJoin(true);
    if (meet?.meetConfig.videoDisabled)
      setDisableVideoOnJoin(true);
    if (meet.hostAddresses.includes(address)) {
      console.log("host")
      setIsPeerHost(true);
      setAccessDenied(false);
      addHostAddress(peerAddress)
      setIsHost(true);
      pushPeerToLobby();
    }
    else if (meet.meetConfig.isPrivate) {
      console.log("private meet")
      const hasSBTBalance = await checkSBTBalance();
      console.log(meet.participantAddresses, address, hasSBTBalance)
      if (meet.participantAddresses.includes(address) && hasSBTBalance) {
        console.log("allowed")
        setAccessDenied(false);
        pushPeerToLobby();
      } else
        setAccessDenied(true);
    } else
      pushPeerToLobby();
  }

  useEffect(() => {
    const checkMeetingConditions = async () => {
      await checkLobbyConditions();
    }
    checkMeetingConditions();
  }, []);


  // Event Listener
  useEventListener("app:cam-on", (camStream) => {
    if (camStream && videoRef.current) {
      videoRef.current.srcObject = camStream;
    }
  });

  useEventListener("lobby:joined", () => {
    console.log("lobby:joined by ", me);
    setMyPeerId(me.meId);
  });

  useEffect(() => {
    if (isRoomJoined) {
      push(`/meeting/room/${params.slug}`);
    }
  }, [isRoomJoined]);



  const handleMeetStart = () => {
    console.log("is lobby joined", isLobbyJoined)
    if (!isLobbyJoined) return;
    setMyPeerId(me.meId);
    joinRoom();
  }

  if (isLoading) return (<div>...loading</div>)
  if (accessDenied) return (<div>Access Denied</div>)
  return (
    <div>
      {isLobbyJoined}
      {JSON.stringify(peers)}
      <h2 className="text-2xl">Room State</h2>
      <br />
      Meeting id:  {params?.slug}
      <br />
      {!isLobbyJoined ?
        <>
          <Button
            disabled={!joinLobby.isCallable}
            onClick={() => checkLobbyConditions()
            }>
            Join Lobby
          </Button>
        </> :
        <div>Joined</div>
      }
      {isLobbyJoined ? "" : error}
      {isLobbyJoined ?
        <Button disabled={!leaveLobby.isCallable} onClick={leaveLobby}>
          LEAVE LOBBY
        </Button> : ""
      }

      {isLobbyJoined &&
        <div className="flex gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Your display name"
            value={displayNameText}
            onChange={(e) => setDisplayNameText(e.target.value)}
            className="border-2 border-gray-300 text-black h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none mr-2"
          />
          <Button
            // disabled={!setDisplayName.isCallable}
            onClick={() => {
              setDisplayName(displayNameText);
              console.log(`Lob Display Name: ${displayNameText}`);
            }}
          >
            {`SET_DISPLAY_NAME`}
          </Button>
          <Button
            disabled={!fetchVideoStream.isCallable}
            onClick={fetchVideoStream}
          >
            FETCH_VIDEO_STREAM
          </Button>

          <Button
            disabled={!fetchAudioStream.isCallable}
            onClick={fetchAudioStream}
          >
            FETCH_AUDIO_STREAM
          </Button>
          {/* <Link href={`/meeting/room/${params.slug}`}> */}
          <Button disabled={!joinRoom.isCallable} onClick={handleMeetStart}>
            JOIN_ROOM
          </Button>
          {/* </Link> */}
          <Button
            disabled={!stopVideoStream.isCallable}
            onClick={stopVideoStream}
          >
            STOP_VIDEO_STREAM
          </Button>
          <Button
            disabled={!stopAudioStream.isCallable}
            onClick={stopAudioStream}
          >
            STOP_AUDIO_STREAM
          </Button>

        </div>
      }

      <br />

      {
        isPeerHost && (
          <div>
            Add Participants:

          </div>
        )
      }
      Me Video:
      <video ref={videoRef} autoPlay muted></video>
      {isRoomJoined && <div>
        <VideoScreen peers={peers} />
        <Controls />
        <Participants peers={peers} />
      </div>
      }
    </div>
  )
}

export default MeetLobby
