"use client";

import React, { useEffect } from 'react'

import { useRoom, useVideo, useAudio } from '@huddle01/react/hooks';
import Button from '@/app/components/Button';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useEventListener, useRecording } from '@huddle01/react/hooks';
import { useMeStore, useMeetingStore } from '@/app/store/MeetingStore';
import 'regenerator-runtime/runtime'


const Controls = ({ URL }) => {
    const { push } = useRouter();
    const shareScreenRef = useRef(null);
    const [isAudioPlaying, setIsAudioPlaying] = React.useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);
    const { isStarting, inProgress, isStopping, data } = useRecording();
    const isMuteOnJoin = useMeetingStore(state => state.isMuteOnJoin);
    const isDisableVideoOnJoin = useMeetingStore(state => state.isDisableVideoOnJoin);
    var screenShareStream = null;
    var recorder;

    if (typeof RecordRTC_Extension === 'undefined') {
        recorder = null;
    } else {
        recorder = new RecordRTC_Extension();
    }

    const startRecording = async () => {
        try {
            if (recorder == undefined || recorder == null) {
                alert("RecordRTC chrome extension is either disabled or not installed. Install the extension to record the screen")
            } else {
                recorder.startRecording({
                    enableScreen: true,
                    enableMicrophone: true,
                    enableSpeakers: true
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

    const stopRecording = async () => {
        // console.log(recorder)
        recorder.stopRecording(function (blob, error) {
            console.log("blob", blob)
            console.log("error", error)
            recorder = null;
            if (blob == false) {
                alert("RecordRTC chrome extension is either disabled or not installed. Install the extension to record the screen")
                return;
            }
            const link = document.createElement('a');
            link.href = window.URL?.createObjectURL(blob);
            link.download = `recording-${+new Date()}.webm`;
            link.click();
        });
    }
    const enableShareScreen = async () => {
        try {
            screenShareStream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
                audio: true,
            });
            if (shareScreenRef.current && screenShareStream) {
                shareScreenRef.current.srcObject = screenShareStream;
                stopProducingVideo();
                stopProducingAudio();
                produceVideo(screenShareStream);
                produceAudio(screenShareStream);
            }
        } catch (error) {
            console.log(error)
        }
    };
    const disableScreenShare = () => {
        let tracks = shareScreenRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
        shareScreenRef.current.srcObject = null;
        stopProducingAudio();
        stopProducingVideo();
        if (isAudioOn) fetchAudioStream();
        if (isVideoOn) fetchVideoStream();
        screenShareStream = null;
    }
    useEffect(() => {
        console.log(isMuteOnJoin, isDisableVideoOnJoin)
        if (isMuteOnJoin) {
            stopAudioStream();
            setIsAudioPlaying(false)
        }
        if (isDisableVideoOnJoin) {
            stopVideoStream();
            setIsVideoPlaying(false)
        }
    }, []);
    useEffect(() => {
        if (shareScreenRef.current == null) {
            stopProducingAudio();
            stopProducingVideo();
            if (isAudioPlaying) fetchAudioStream();
            if (isVideoPlaying) fetchVideoStream();
        }
    }, [shareScreenRef.current])
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
                    onClick={() => {
                        fetchAudioStream()
                        setIsAudioPlaying(true)
                    }}
                >
                    Start Mic (Un-mute)
                </Button>
                <Button
                    disabled={isVideoOn}
                    onClick={() => {
                        fetchVideoStream()
                        setIsVideoPlaying(true)
                    }}
                >
                    Start Camera
                </Button>

                <Button
                    disabled={!isAudioOn}
                    onClick={() => {
                        stopAudioStream()
                        setIsAudioPlaying(false)
                    }}
                >
                    Stop Mic (Mute)
                </Button>

                <Button
                    disabled={!isVideoOn}
                    onClick={() => {
                        stopVideoStream()
                        setIsVideoPlaying(false)
                    }}
                >
                    Stop Camera
                </Button>
                <Button disabled={!leaveRoom.isCallable} onClick={() => {
                    leaveRoom();
                    push('/schedule/')
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
                    // disabled={!stopRecording.isCallable} onClick={stopRecording}
                    onClick={() => stopRecording()}
                >
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
