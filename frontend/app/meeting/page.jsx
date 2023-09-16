"use client";
import 'regenerator-runtime/runtime'

import React, { useEffect } from "react";
import { initHuddle } from "../hooks/Huddle";
import Button from "../components/Button";
import { getWalletDetails } from "../hooks/Web3";
import axios from "axios";
import { ENV } from "../constants/EnvVars";
import { CREATE_MEET_ROOM_URL } from "../constants/Api";
import Link from "next/link";
import { useLobby } from "@huddle01/react/hooks";

const MeetHome = () => {
  const { roomState, me } = initHuddle();
  // console.log(me)
  // console.log(ENV)
  const [myState, setMyState] = React.useState("");
  useEffect(() => {
    if (roomState != "IDLE")
      setMyState(me)
  }, []);

  useEffect(() => {
    const setHostAddress = async () => {
      const { address } = await getWalletDetails();
      if (address)
        setHostWalletAddresses([address]);
    };
    setHostAddress();
  }, []);

  const [meetTitle, setMeetTitle] = React.useState("General Meeting");
  const [meetDescription, setMeetDescription] = React.useState("No description");
  const [muteOnEntry, setMuteOnEntry] = React.useState(false);
  const [disableVideo, setDisableVideo] = React.useState(false);
  const [hostWalletAddresses, setHostWalletAddresses] = React.useState([]);
  const [meetingId, setMeetingId] = React.useState("");
  const { joinLobby } = useLobby();


  const createMeeting = async () => {
    try {
      const response = await axios.post('/api/meetings', {
        meetTitle: meetTitle,
        meetDescription: meetDescription,
        muteOnEntry: muteOnEntry,
        disableVideo: disableVideo,
        hostWalletAddresses: hostWalletAddresses,
        API_KEY: ENV.API_KEY, // Assuming ENV.API_KEY is defined elsewhere
      });
      console.log(response)
      if (response.status === 200) {
        setMeetingId(response.data.data.roomId);
        console.log(meetingId);
      } else {
        console.log('Error');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <>
      <h1>Meeting page</h1>
      <br />
      <h2 className="text-2xl">Room State</h2>
      {/* <h3 className="break-words">{JSON.stringify(state.value)}</h3> */}
      <p>Meeting state: {roomState}</p>
      <p>Me: {JSON.stringify(myState)}</p>
      <Button onClick={createMeeting} >Create Meeting</Button>
      <br />
      <input
        type="text"
        placeholder="Meeting Title"
        onChange={(e) => setMeetTitle(e.target.value)}
        className="border-2 border-gray-300 bg-white text-black h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none mr-2"
      />
      <br />
      <input
        type="text"
        placeholder="Meeting Description"
        onChange={(e) => setMeetDescription(e.target.value)}
        className="border-2 border-gray-300 bg-white text-black h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none mr-2"
      />
      <br />
      <pre className="inline">Mute participants' on entry: </pre>
      <input
        type="checkbox"
        onChange={(e) => setMuteOnEntry(e.target.checked)}
        className="border-2 border-gray-300 bg-white  px-5 pr-16 rounded-lg text-sm focus:outline-none mr-2"
      />
      <br />
      <pre className="inline">Enable participants' video on entry: </pre>
      <input
        type="checkbox"
        onChange={(e) => setDisableVideo(e.target.checked)}
        className="border-2 border-gray-300 bg-white  px-5 pr-16 rounded-lg text-sm focus:outline-none mr-2"
      />
      <br />
      {
        hostWalletAddresses.length == 0 ? "No wallet address detected so you are not the host" :
          <p>Host wallet address: {hostWalletAddresses[0]}</p>
      }
      <br />
      {
        meetingId == "" ? "" : (
          <>
            <p>Meeting ID: {meetingId}</p>
            <Link href={`/meeting/lobby/${meetingId}`}><Button onClick={
              () => {
                joinLobby(meetingId)
              }
            }>Check the details and click here</Button></Link>
          </>
        )
      }
    </>
  );
};

export default MeetHome;
