"use client";

import Button from '@/app/components/Button';
import { createMeeting } from '@/app/hooks/MeetApiCalls';
import React from 'react'

const PublicMeet = () => {
    const [meetTitle, setMeetTitle] = React.useState("General Meeting");
    const [meetDescription, setMeetDescription] = React.useState("No description");
    const [roomId, setMeetRoomId] = React.useState("");
    const handleCreateRoom = async () => {
        const meetPresets = {
            meetTitle,
            meetDescription,
            muteOnEntry: false,
            disableVideo: false,
            hostWalletAddresses: [],
            participantsWalletAddresses: [],
            isPrivate: false,
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
            <h1>Public Meet - anyone can join</h1>
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
            <Button onClick={handleCreateRoom}>Create Meeting</Button>
            <br />
            {
                roomId && (
                    <div>
                        <pre>Meeting created successfully</pre>
                        <pre>Meeting ID: {roomId}</pre>
                        <pre>Meeting URL: {`${window.location.origin}/meeting/lobby/${roomId}`}</pre>
                    </div>
                )
            }
        </div>
    )
}

export default PublicMeet
