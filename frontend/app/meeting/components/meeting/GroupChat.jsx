"use client";

import React from 'react'
import { useAppUtils } from "@huddle01/react/app-utils";
import { useHuddle01 } from '@huddle01/react';
import 'regenerator-runtime/runtime'
import { useMeetingStore } from '@/app/store/MeetingStore';


const GroupChat = () => {
    const { me } = useHuddle01();
    const [groupMessage, setGroupMessage] = React.useState("");
    const { sendData } = useAppUtils();
    const roomMessages = useMeetingStore(state => state.roomMessages);
    const addRoomMessage = useMeetingStore(state => state.addRoomMessage);
    return (
        <div>
            GroupChat
            <input
                type="text"
                placeholder="Meeting Title"
                onChange={(e) => setGroupMessage(e.target.value)}
                className="border-2 border-gray-300 bg-white text-black h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none mr-2"
            />
            <button onClick={() => {
                sendData('*', {
                    sender: me,
                    message: groupMessage,
                    kind: "group"
                })
                addRoomMessage({
                    sender: me,
                    message: groupMessage,
                    kind: "group",
                    receiver: "*",
                })
                console.log("sent group message - ", groupMessage, " - to all peers");
            }}>Send</button>
            <div>
                {
                    roomMessages.map((message, index) => {
                        if (message.kind == "group")
                            return (
                                <div key={index}>
                                    <p>{message.sender.displayName} - {message.message} - {message.timeStamp}</p>
                                </div>
                            )
                    })
                }
            </div>
        </div>
    )
}

export default GroupChat
