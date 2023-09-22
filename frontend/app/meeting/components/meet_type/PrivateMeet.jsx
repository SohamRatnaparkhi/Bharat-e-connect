"use client";

import Button from '@/app/components/Button';
import { parseFile } from '@/app/hooks/FileManagement';
import { createMeeting } from '@/app/hooks/MeetApiCalls';
import { getWalletDetails } from '@/app/hooks/Web3';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FileUploader } from 'react-drag-drop-files';

const PrivateMeet = () => {
  const [meetTitle, setMeetTitle] = useState("General Meeting");
  const [meetDescription, setMeetDescription] = useState("No description");
  const [muteOnEntry, setMuteOnEntry] = useState(false);
  const [disableVideo, setDisableVideo] = useState(false);
  const [hostWalletAddresses, setHostWalletAddresses] = useState([]);
  const [walletsStr, setWalletStr] = useState();
  const [participantsWalletAddresses, setParticipantsWalletAddresses] = useState([]);
  const [walletsStrParticipants, setWalletStrParticipants] = useState();
  const [meetRoomId, setMeetRoomId] = useState("");

  useEffect(() => {
    const setHostAddress = async () => {
      var { address } = await getWalletDetails();
      address = await address;
      if (address) {
        if (hostWalletAddresses.length > 0)
          setHostWalletAddresses([...hostWalletAddresses, address]);
        else
          setHostWalletAddresses([address]);
        setWalletStr(address);
      }
    };
    setHostAddress();
  }, []);

  console.log(hostWalletAddresses)

  const fileTypes = ["csv", "json"];

  const handleHostFileChange = (file) => {
    fileAction(file, true);
    return;
  }

  const handleHostFileDrop = (file) => {
    fileAction(file, true);
    return;
  };

  const handlePeerFileChange = (file) => {
    fileAction(file, false);
    return;
  }

  const handlePeerFileDrop = (file) => {
    fileAction(file, false);
    return;
  };
  const fileAction = (file, isHost) => {
    const getFileData = async () => {
      try {
        const data = await parseFile(file);
        if (data) {
          if (isHost)
            if (hostWalletAddresses.length === 0)
              setHostWalletAddresses(data);
            else
              setHostWalletAddresses([...hostWalletAddresses, ...data]);
          else {
            if (participantsWalletAddresses.length === 0)
              setParticipantsWalletAddresses(data);
            else
              setParticipantsWalletAddresses([...participantsWalletAddresses, ...data]);
          }
        }
      }
      catch (err) {
        alert(err.message);
      }
    }
    getFileData();
  }

  const handleCreateRoom = async () => {
    const commaSeparatedHosts = walletsStr.split(",");
    const commaSeparatedParticipants = walletsStrParticipants?.split(",");
    if (commaSeparatedHosts)
      hostWalletAddresses.push(...commaSeparatedHosts);
    if (commaSeparatedParticipants)
      participantsWalletAddresses.push(...commaSeparatedParticipants);
    const meetPresets = {
      meetTitle,
      meetDescription,
      muteOnEntry,
      disableVideo,
      hostWalletAddresses,
      participantsWalletAddresses,
      isPrivate: true,
    }
    const { data, error } = await createMeeting(meetPresets);
    if (error)
      alert(error.message);
    const roomId = data?.data?.roomId;
    if (!roomId)
      alert("Something went wrong");
    setMeetRoomId(roomId);
  };

  return (
    <div>
      <h1>Private Meet</h1>
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
      <pre className="inline">Disable participants' video on entry: </pre>
      <input
        type="checkbox"
        onChange={(e) => setDisableVideo(e.target.checked)}
        className="border-2 border-gray-300 bg-white  px-5 pr-16 rounded-lg text-sm focus:outline-none mr-2"
      />
      <br />
      <br />
      <div>
        <pre className="inline">Wallets of the hosts (comma separated): </pre>
        <input
          type="text"
          placeholder="Wallets of the hosts (comma separated)"
          onChange={(e) => setWalletStr(e.target.value)}
          className="border-2 border-gray-300 bg-white text-black h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none mr-2"
        />
        <br />
        OR
        <br />
        Drop a csv with a host addresses in first column containing host wallet addresses or json file with a object named "address" containing wallets addresses of the hosts
        <br />
        <FileUploader
          handleChange={handleHostFileChange}
          name="Hosts"
          types={fileTypes}
          hoverTitle="Drop File Here"
          onDrop={handleHostFileDrop}
        />
      </div>
      <br />
      <div>
        <pre className="inline">Wallets of the participants (comma separated): </pre>
        <input
          type="text"
          placeholder="Wallets of the participants (comma separated)"
          onChange={(e) => setWalletStrParticipants(e.target.value)}
          className="border-2 border-gray-300 bg-white text-black h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none mr-2"
        />
        <br />
        OR
        <br />
        Drop a csv with a host addresses in first column containing host wallet addresses or json file with a object named "address" containing wallets addresses of the participants
        <br />
        <FileUploader
          handleChange={handlePeerFileChange}
          name="Hosts"
          types={fileTypes}
          hoverTitle="Drop File Here"
          onDrop={handlePeerFileDrop}
        />
      </div>
      <br />
      <Button
        disabled={meetTitle === "" || meetDescription === "" || walletsStr === ""}
        onClick={handleCreateRoom}
      >
        Create Meeting
      </Button>
      <br />
      <br />
      {
        meetRoomId && (
          <div>
            <pre>Meeting created successfully</pre>
            <pre>Meeting ID: {meetRoomId}</pre>
            <pre>Meeting URL: {`${window.location.origin}/meeting/lobby/${meetRoomId}`}</pre>
          </div>
        )
      }
    </div>
  )
}

export default PrivateMeet
