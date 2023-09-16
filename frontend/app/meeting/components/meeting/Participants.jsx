import Button from '@/app/components/Button';
import { useMeStore, useMeetingStore } from '@/app/store/MeetingStore';
import React from 'react';
import { useAcl, useHuddle01 } from '@huddle01/react/hooks';
import { useAppUtils } from "@huddle01/react/app-utils";
import 'regenerator-runtime/runtime'


const Participants = ({ peers }) => {
    const isHost = useMeStore(state => state.isHost);
    const { kickPeer } = useAcl();
    const { sendData } = useAppUtils();
    const addRoomMessage = useMeetingStore(state => state.addRoomMessage);
    const [message, setMessage] = React.useState("");
    const { me } = useHuddle01();

    return (
        <div>
            Participants
            <br />
            {Object.values(peers)
                .map((peer) => (
                    <>
                        {JSON.stringify(peer)}
                        {
                            isHost && <Button
                                onClick={() => {
                                    kickPeer(peer.peerId)
                                }}
                                disabled={!kickPeer.isCallable}>
                                Remove Participant
                            </Button>
                        }
                        <input
                            type="text"
                            placeholder="Meeting Title"
                            onChange={(e) => setMessage(e.target.value)}
                            className="border-2 border-gray-300 bg-white text-black h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none mr-2"
                        />
                        <Button onClick={() => {
                            sendData([peer.peerId], {
                                sender: me,
                                message: message,
                                kind: "private"
                            })
                            addRoomMessage({
                                sender: me,
                                message: message,
                                kind: "private",
                                receiver: peer.peerId,
                            })
                            console.log("sent private message - ", message, " - to ", peer.peerId);
                        }}>Send</Button>
                        <br />
                    </>
                ))}
        </div>
    )
}

export default Participants
