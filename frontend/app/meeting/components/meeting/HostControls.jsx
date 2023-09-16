"use client";

import Button from '@/app/components/Button';
import React from 'react';
import { useAcl } from '@huddle01/react/hooks';
import { useMeetingStore } from '@/app/store/MeetingStore';
import 'regenerator-runtime/runtime'

const HostControls = () => {
    const { changeRoomControls } = useAcl();
    const isMuteLocked = useMeetingStore(state => state.isMuteLocked);
    const setIsMuteLocked = useMeetingStore(state => state.setIsMuteLocked);
    const isVideoLocked = useMeetingStore(state => state.isVideoLocked);
    const setIsVideoLocked = useMeetingStore(state => state.setIsVideoLocked);

    return (
        <div>
            Host Controls
            <Button
                onClick={() => {
                    changeRoomControls("muteEveryone", true);
                    setIsMuteLocked(true);
                }}
                disabled={isMuteLocked}
            >
                Mute everyone</Button>
            <Button
                onClick={
                    () => {
                        changeRoomControls("muteEveryone", false);
                        setIsMuteLocked(false);
                    }}
                disabled={!isMuteLocked}
            >
                Unmute everyone
            </Button>
            <Button
                onClick={() => {
                    changeRoomControls("disableVideo", true);
                    setIsVideoLocked(true);
                }}
                disabled={isVideoLocked}
            >
                Disable video for everyone
            </Button>
            <Button
                onClick={() => {
                    changeRoomControls("disableVideo", false);
                    setIsVideoLocked(false);
                }}
                disabled={!isVideoLocked}
            >
                Enable video for everyone
            </Button>
        </div >
    )
}

export default HostControls
