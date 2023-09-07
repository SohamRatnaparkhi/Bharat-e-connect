"use client";

import React from 'react'

import { useRoom, useVideo, useAudio } from '@huddle01/react/hooks';
import Button from '@/app/components/Button';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useEventListener, useRecording } from '@huddle01/react/hooks';

const Controls = ({ URL }) => {
    const { push } = useRouter();
    const shareScreenRef = useRef(null);
    const { startRecording, stopRecording, isStarting, inProgress, isStopping, data } = useRecording();
    const enableShareScreen = async () => {
        const stream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: true,
        });
        if (shareScreenRef.current && stream) {
            shareScreenRef.current.srcObject = stream;
            produceVideo(stream);
            produceAudio(stream);
        }
    };
    const disableScreenShare = () => {
        shareScreenRef.current.srcObject = null;
    }
    const {
        produceAudio,
        stopProducingAudio,
        stopAudioStream,
        fetchAudioStream,
        isAudioOn,

    } = useAudio();
    const {
        produceVideo,
        stopProducingVideo,
        stopVideoStream,
        fetchVideoStream,
        isVideoOn
    } = useVideo();
    const { leaveRoom, isLoading, roomId, error } = useRoom();

    console.log("isAudioOn", isAudioOn)
    console.log("isVideoOn", isVideoOn)
    if (isLoading) {
        return <div>Loading...</div>;
    }
    useEventListener("app:mic-on", (stream) => {
        if (stream) produceAudio(stream);
        else fetchAudioStream();
    });

    useEventListener("app:mic-off", () => {
        stopProducingAudio();
    });

    useEventListener("app:cam-on", (stream) => {
        if (stream) produceVideo(stream);
        else fetchVideoStream();
    });

    useEventListener("app:cam-off", () => {
        stopProducingVideo();
    });
    console.log("url in controls", URL)
    const handleRecordStart = async () => {
        console.log("url in function", URL)
        await startRecording(URL);
    }

    return (
        <div>
            {error}
            <div className="flex gap-4 flex-wrap">
                <Button
                    disabled={isAudioOn}
                    onClick={() => fetchAudioStream()}
                >
                    Start Mic (Un-mute)
                </Button>
                <Button
                    disabled={isVideoOn}
                    onClick={() => fetchVideoStream()}
                >
                    Start Camera
                </Button>

                <Button
                    disabled={!isAudioOn}
                    onClick={() => stopAudioStream()}
                >
                    Stop Mic (Mute)
                </Button>

                <Button
                    disabled={!isVideoOn}
                    onClick={() => stopVideoStream()}
                >
                    Stop Camera
                </Button>
                <Button disabled={!leaveRoom.isCallable} onClick={() => {
                    leaveRoom();
                    push('/meeting/')
                }}>
                    LEAVE_ROOM
                </Button>

                <Button onClick={() => enableShareScreen()}>
                    Share Screen
                </Button>
                <Button onClick={() => disableScreenShare()}>
                    Stop Sharing Screen
                </Button>
                <Button
                    // disabled={!startRecording.isCallable}
                    onClick={() => handleRecordStart()}
                >
                    Start Recording
                </Button>
                <Button
                    disabled={!stopRecording.isCallable} onClick={stopRecording}>
                    Stop Recording
                </Button>
            </div>
            <div>
                REcording details
                <br />
                {JSON.stringify(data)}
                {isStarting}
                {inProgress}
                {isStopping}
            </div>
            <div>
                {shareScreenRef && <video
                    ref={shareScreenRef}
                    muted
                    autoPlay
                    style={{ width: "100%" }}
                    className="bg-base-300"
                />}
            </div>
        </div>
    )
}

export default Controls
