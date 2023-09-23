import React from "react";
import TextField from "@mui/material/TextField";

import { createMeeting } from "@/app/hooks/MeetApiCalls";
import { useGetStore } from "@/app/hooks/Store";
import { useAppStore } from "@/app/store/AppStore";
import cn from "@/app/utils/cn";

const PublicMeet = ({ setScheduleMeet, setMeetType }) => {
  const [meetTitle, setMeetTitle] = React.useState("General Meeting");
  const [meetDescription, setMeetDescription] =
    React.useState("No description");
  const [roomId, setMeetRoomId] = React.useState("");
  // const user = useAppStore(state => state.user);
  const user = useGetStore(useAppStore, (state) => state.user);

  const handleCreateRoom = async () => {
    const meetPresets = {
      meetTitle,
      meetDescription,
      muteOnEntry: false,
      disableVideo: false,
      hostWalletAddresses: [],
      participantsWalletAddresses: [],
      isPrivate: false,
    };
    const { data, error } = await createMeeting(meetPresets);
    if (error) alert(error.message);
    const roomId = data?.data?.roomId;
    console.log(`Room ID: ${roomId}`)
    if (!roomId) alert("Something went wrong");
    setMeetRoomId(roomId);
  };

  return (
    <div className=" bg-black bg-opacity-90  w-screen h-screen z-20 absolute grid place-content-center">
      <div className="  bg-white p-10 rounded-lg">
        <div className="text-xl font-medium pb-7">
          <span className="text-[#5D8BF4]">Public</span> Meeting
        </div>

        <div className="py-3 w-80">
          <TextField
            variant="outlined"
            onChange={(e) => {
              setMeetTitle(e.target.value);
            }}
            type="text"
            fullWidth
            label="Meeting Title"
            required
            size="small"
            name="meet-title"
          />
        </div>

        <div className="py-3 ">
          <TextField
            variant="outlined"
            onChange={(e) => {
              setMeetDescription(e.target.value);
            }}
            type="text"
            fullWidth
            label="Meeting Description"
            size="small"
            name="meet-desc"
          />
        </div>

        <div className="py-3 ">
          <TextField
            variant="outlined"
            className="bg-[#f5f5f5]"
            disabled
            type="text"
            fullWidth
            label="Meet ID"
            value={roomId}
            size="small"
            name="meet-id"
          />
        </div>

        <div className={cn(roomId ? "w-full h-10% ": "w-0 h-0" ,"flex flex-row items-center justify-center text-sm text-[#5D8BF4]")}>
          <a href={`${window.location.origin}/meeting/lobby/${roomId}`}>
           {roomId && <p> {window.location.origin}/meeting/lobby/{roomId}</p>}
          </a>
        </div>

        <div className="w-full gap-3 mt-9  flex justify-center">
          <button
            type="button"
            onClick={() => {
              setScheduleMeet(false);
            }}
            className="p-2 w-5/12 rounded-lg border-2 bg-[#7E7E7E] bg-opacity-50 text-black"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleCreateRoom}
            className="p-2 w-7/12 rounded-lg border-2 bg-[#5D8BF4] text-white"
          >
            Create Meeting
          </button>
        </div>

        <div className="w-full mt-7 flex justify-center text-sm">
          Want to create{" "}
          <a
            onClick={() => {
              setMeetType("private");
            }}
            className="text-[#98BCF4] "
          >
            {" "}
            &nbsp; Private meeting ?
          </a>
        </div>
      </div>
    </div>
  );
};

export default PublicMeet;
