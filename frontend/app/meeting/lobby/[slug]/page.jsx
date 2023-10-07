"use client";
import 'regenerator-runtime/runtime'

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
import { FiVideo, FiVideoOff, FiMic, FiMicOff } from 'react-icons/fi';

import Controls from '../../components/meeting/Controls';
import VideoScreen from '../../components/meeting/VideoScreen';
import Participants from '../../components/meeting/Participants';
import { useRouter } from "next/navigation";
import { getMeeting } from '@/app/hooks/MeetApiCalls';
import { useMeetingStore, useMeStore } from '@/app/store/MeetingStore';
import Navbar from '../../components/lobby-comps/Navbar';

import '../../../globals.css'
import cn from '@/app/utils/cn';

const MeetLobby = ({ params }) => {

  const videoRef = useRef();
  const [peerAddress, setPeerAddress] = React.useState(null);
  const { push } = useRouter();
  const [isPeerHost, setIsPeerHost] = React.useState(false);

  const { initialize, me } = useHuddle01();
  const { isRoomJoined, error } = useRoom();
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
    // error,
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

  // useEffect(() => {
  //   const setPeerEthAddress = async () => {
  //     var { address } = await getWalletDetails();
  //     if (address)
  //       setPeerAddress(address);
  //     console.log(address)
  //   };
  //   setPeerEthAddress();
  // }, [peerAddress]);

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

  console.log(error)

  const checkLobbyConditions = async () => {
    const meetDetails = await getMeeting(params.slug);
    const meet = meetDetails.data?.data;
    setRoomId(meet.roomId);

    if(!meet?.meetConfig.isPrivate) {
      pushPeerToLobby();
      console.log("Public Meeting")
      return;
    }

    var { address } = await getWalletDetails();
    setMyEthAddress(address);
    setPeerAddress(address);
    console.log(meetDetails)
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

  const [videoOn, setVideoOn] = React.useState(false);
  const [audioOn, setAudioOn] = React.useState(false);

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
    console.log(isRoomJoined)
    console.log("abcd")
  }, [isRoomJoined]);


  console.log(isRoomJoined)
  const handleMeetStart = () => {
    console.log("is lobby joined", isLobbyJoined)
    // if (!isLobbyJoined) return;
    setMyPeerId(me.meId);
    console.log("joining room")
    joinRoom();
    console.log("joining room done")
  }

  if (isLoading) return (<div><iframe src="https://lottie.host/?file=307fb28b-48a0-477a-8c49-a9ba66f14a79/clHpsh7QES.json"></iframe></div>)
  if (accessDenied) return (<div>Access Denied</div>)
  return (
    <div className='h-full w-full flex flex-col items-center bg-rad-blue-grad-tr-bl'>
      <Navbar />
      {/* {isLobbyJoined}
      {JSON.stringify(peers)} */}
      {isRoomJoined}
      <h2 className="text-3xl font-bold m-5">READY TO JOIN?</h2>
      
      <div className='flex flex-col items-center bg-[#5D8BF436] h-3/5 w-1/2 rounded-[20px]'>
        <div className='relative w-full h-25% flex flex-row justify-center items-center' >
          <div className='flex flex-col w-90% items-center pt-[1px] justify-center ml-[60px]'>
            <div className='flex flex-row justify-center w-3/5 font-semibold'>
              Meeting id:  
                <div className='flex justify-center border-[1px] w-2/5 border-[#5b5b5b7f] bg-white rounded-[2px] ml-4 font-normal'>{params?.slug}</div>
            </div>
            {!isLobbyJoined ?
              <>
                <Button
                  disabled={!joinLobby.isCallable}
                  onClick={() => checkLobbyConditions()
                  }>
                  Join Lobby
                </Button>
              </> :
              <div className='font-semibold mt-3'>Joined! ✅</div>
            }
          </div>
          <div className='w-10% h-full pt-5 pl-2 flex flex-col justify-start'>
            <div className='border-[3px] border-black w-[35px] h-[35px] rounded-full flex items-center justify-center text-xl font-semibold hove:text-[#EE2A2A]'>
              {/* {isLobbyJoined ? "" : error} */}
                {isLobbyJoined ?
                  <button disabled={!leaveLobby.isCallable} onClick={leaveLobby}>
                    X
                  </button> : ""
                }
            </div>
          </div>
        </div>

        <div className='relative flex justify-center w-3/6 h-3/6'>
          {!videoOn 
            ? <div className='-z-2 w-full h-full rounded-[6px] bg-black bg-gradient-to-t from-slate-400 flex justify-center items-center' >

            </div>
            : <video ref={videoRef} className='h-full rounded-[6px] align-middle' autoPlay muted />
          }
          {isRoomJoined && 
            <div>
              <VideoScreen peers={peers} />
              <Controls />
              <Participants peers={peers} />
            </div>
          }
            {/* Video and mic buttons */}
            <div className='absolute left-1/3 bottom-3 w-30% h-15% flex flex-row justify-around cursor-pointer'>
              <button
                disabled={!fetchVideoStream.isCallable}
                onClick={() => {
                  setVideoOn(!videoOn);
                  console.log(videoOn)
                  videoOn ? stopVideoStream(): fetchVideoStream() ;
                }}
                className={cn(videoOn ? 'bg-[#3535358C]':'bg-[#EE2A2A]', 'relative flex justify-center items-center w-[34px] h-[34px] rounded-full text-white')}
              >
                {videoOn ? <FiVideo /> : <FiVideoOff /> }
              </button>
              
              <button
                disabled={!fetchAudioStream.isCallable}
                onClick={()=>{
                  setAudioOn(!audioOn);
                  audioOn ? stopAudioStream() :fetchAudioStream();
                }}
                className={cn(audioOn ? 'bg-[#3535358C]':'bg-[#EE2A2A]','relative flex justify-center items-center w-[34px] h-[34px] rounded-full text-white')}
              >
                {audioOn ?  <FiMic />: <FiMicOff />}
              </button>
            </div>
        </div>
  
        {isLobbyJoined &&
          <div className="flex gap-4 flex-col pt-2 items-center">
            <label htmlFor="displayName" className='font-semibold'>JOIN AS A</label>
            <input
              name='displayName'
              type="text"
              placeholder="Your display name"
              value={displayNameText}
              onChange={(e) => setDisplayNameText(e.target.value)}
              className="border-2 border-gray-300 text-black h-10 px-16  rounded-[2px] text-center text-sm focus:outline-none"
            />
            
          </div>
        }
  
        
      
        {
          isPeerHost && (
            <div>
              Add Participants:
          
            </div>
          )
        }
        
      </div>

        <div className='flex justify-center items-center w-20% mt-6'>
          <Button
                  // disabled={!setDisplayName.isCallable}
                  disabled={!joinRoom.isCallable}
                  onClick={() => {

                    setDisplayName(displayNameText);
                    handleMeetStart();
                    console.log(`Lob Display Name: ${displayNameText}`);
                  }}

                >
                  {`JOIN MEET ${joinRoom.isCallable}`}
          </Button>
        </div>
    </div>
  )
}

export default MeetLobby
