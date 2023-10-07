import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { parseFile } from "@/app/hooks/FileManagement";
import { createMeeting } from "@/app/hooks/MeetApiCalls";
import { getWalletDetails } from "@/app/hooks/Web3";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";

import { useAppStore } from "@/app/store/AppStore";

const PrivateMeet = ({ setMeetType, setScheduleMeet }) => {
  const [meetTitle, setMeetTitle] = useState("General Meeting");
  const [meetDescription, setMeetDescription] = useState("No description");
  const [muteOnEntry, setMuteOnEntry] = useState(false);
  const [disableVideo, setDisableVideo] = useState(false);
  const [hostWalletAddresses, setHostWalletAddresses] = useState([]);
  const [walletsStr, setWalletStr] = useState();
  const [participantsWalletAddresses, setParticipantsWalletAddresses] =
    useState([]);
  const [walletsStrParticipants, setWalletStrParticipants] = useState();
  const [meetRoomId, setMeetRoomId] = useState("");
  const user = useAppStore((state) => state.user);
  const [date, setDate] = useState();
  const [startTime, setStartTime] = useState();

  useEffect(() => {
    const setHostAddress = async () => {
      var { address } = await getWalletDetails();
      address = await address;
      if (address) {
        if (hostWalletAddresses.length > 0)
          setHostWalletAddresses([...hostWalletAddresses, address]);
        else setHostWalletAddresses([address]);
        setWalletStr(address);
      }
    };
    setHostAddress();
  }, []);

  console.log(hostWalletAddresses);

  const fileTypes = ["csv", "json"];

  const handleHostFileChange = (file) => {
    fileAction(file, true);
    return;
  };

  const handleHostFileDrop = (file) => {
    fileAction(file, true);
    return;
  };

  const handlePeerFileChange = (file) => {
    fileAction(file, false);
    return;
  };

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
            if (hostWalletAddresses.length === 0) setHostWalletAddresses(data);
            else setHostWalletAddresses([...hostWalletAddresses, ...data]);
          else {
            if (participantsWalletAddresses.length === 0)
              setParticipantsWalletAddresses(data);
            else
              setParticipantsWalletAddresses([
                ...participantsWalletAddresses,
                ...data,
              ]);
          }
        }
      } catch (err) {
        alert(err.message);
      }
    };
    getFileData();
  };

  const handleCreateRoom = async () => {

    console.log("User", user)

    const day = Number(date.split("-")[2]);
    const month = Number(date.split("-")[1]);
    const year = Number(date.split("-")[0]);

    const commaSeparatedHosts = walletsStr.split(",");
    const commaSeparatedParticipants = walletsStrParticipants?.split(",");
    if (commaSeparatedHosts) hostWalletAddresses.push(...commaSeparatedHosts, user?.ethAddress);
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
      date: new Date(year, month, day),
      startTime: startTime,
    };
    const { data, error } = await createMeeting(meetPresets);
    if (error) alert(error.message);
    const roomId = data?.data?.roomId;
    if (!roomId) alert("Something went wrong");
    setMeetRoomId(roomId);
  };

  return (
    <div className=" bg-black bg-opacity-90  w-screen h-screen z-20 absolute grid place-content-center">
      <div className="  bg-white p-10 rounded-lg">
        <div className="text-xl font-medium pb-7">
          <span className="text-[#5D8BF4]">Private</span> Meeting
        </div>

        <div className="py-2 w-80">
          <TextField
            variant="outlined"
            type="text"
            onChange={(e) => setMeetTitle(e.target.value)}
            fullWidth
            label="Meeting Title"
            required
            size="small"
            name="meet-title"
          />
        </div>

        <div className="py-2 ">
          <TextField
            variant="outlined"
            type="text"
            onChange={(e) => setMeetDescription(e.target.value)}
            fullWidth
            label="Meeting Description"
            size="small"
            name="meet-desc"
          />
        </div>

        <div className="py-2 ">
          <TextField
            variant="outlined"
            type="date"
            onChange={(e) => {
              setDate(e.target.value);
              console.log("Date:" + e.target.value);
            }}
            fullWidth
            size="small"
            name="date"
          />
        </div>

        <div className="py-2 flex justify-between">
          <TextField type="time" onChange={(e)=>{setStartTime(e.target.value)}} className="w-5/12" size="small" name="date" />
          <img src="arrow-right.svg" width={30} />
          <TextField
            variant="outlined"
            type="time"
            className="w-5/12"
            size="small"
            name="date"
          />
        </div>

        <div className="py-2 flex justify-between items-center ">
          <label>Add Participants</label>
          <div className=" flex gap-3">
            <FileUploader
              handleChange={handlePeerFileChange}
              name="Hosts"
              types={fileTypes}
              hoverTitle="Drop File Here"
              onDrop={handlePeerFileDrop}
              children={
                <div className="flex flex-row items-center justify-center w-full px-4 h-full border-[1px] border-[#aaaaaa] rounded-[10px] text-sm">
                  choose file
                </div>
              }
            />
            <img src="plus-square.svg" width={30} />
          </div>
        </div>

        <div className="py-2 "></div>

        <div className="py-2 w-80  flex justify-between items-center ">
          <label for="mic" className="text-sm">
            Mute participants' on entry{" "}
          </label>
          <input
            type="checkbox"
            onChange={(e) => setMuteOnEntry(e.target.checked)}
            id="mic"
            name="mic"
            value="mic"
            className="w-5 h-5 "
          ></input>
        </div>

        <div className="py-2 w-80  flex justify-between items-center ">
          <label for="video" className="text-sm">
            Disable participants' video on entry{" "}
          </label>
          <input
            type="checkbox"
            onChange={(e) => setDisableVideo(e.target.checked)}
            id="video"
            name="video"
            value="video"
            className="w-5 h-5 "
          ></input>
        </div>

        <div className="py-2 mt-2">
          <TextField
            variant="outlined"
            className="bg-[#f5f5f5] text-[#5D8BF4]]"
            disabled
            type="text"
            fullWidth
            label="Meet ID"
            value={meetRoomId}
            size="small"
            name="meet-id"
          />
        </div>

        {meetRoomId && (
          <div className="w-full h-auto flex items-center justify-center">
            <a
              href={`${window.location.origin}/meeting/lobby/${meetRoomId}`}
            >{`${window.location.origin}/meeting/lobby/${meetRoomId}`}</a>
          </div>
        )}

        <div className="w-full gap-3 mt-9  flex justify-center">
          <button
            onClick={() => {
              setScheduleMeet(false);
            }}
            type="button"
            className="p-2 w-5/12 rounded-lg border-2 bg-[#7E7E7E] bg-opacity-50 text-black"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateRoom}
            type="button"
            className="p-2 w-7/12 rounded-lg border-2 bg-[#5D8BF4] text-white"
          >
            Create Meeting
          </button>
        </div>

        <div className="w-full mt-7 flex justify-center text-sm">
          Want to create{" "}
          <a
            onClick={() => {
              setMeetType("public");
            }}
            className="text-[#98BCF4] "
          >
            {" "}
            &nbsp; Public meeting ?
          </a>
        </div>
      </div>
    </div>
  );
};

export default PrivateMeet;
