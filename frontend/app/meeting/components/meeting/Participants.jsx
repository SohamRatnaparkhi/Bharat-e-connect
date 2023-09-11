import Button from '@/app/components/Button';
import { useMeStore } from '@/app/store/MeetingStore';
import React from 'react';
import { useAcl } from '@huddle01/react/hooks';


const Participants = ({ peers }) => {
    const isHost = useMeStore(state => state.isHost);
    const { kickPeer } = useAcl();
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
                        <br />
                    </>
                ))}
        </div>
    )
}

export default Participants
