import React, { useRef } from 'react'
import { Audio, Video, } from "@huddle01/react/components";
import { useHuddle01 } from '@huddle01/react';
import { useEventListener } from '@huddle01/react/hooks';

const VideoScreen = ({ peers }) => {
    console.log(peers)
    const { me } = useHuddle01();
    const videoRef = useRef();
    useEventListener("app:cam-on", (camStream) => {
        if (camStream && videoRef.current) {
            videoRef.current.srcObject = camStream;
        }
    });
    useEventListener("app:cam-off", () => {
        videoRef.current.srcObject = null;
    }
    );
    return (
        <div>
            {Object.values(peers)
                .filter((peer) => peer.cam)
                .map((peer) => (
                    <>
                        <Video
                            key={peer.peerId}
                            peerId={peer.peerId}
                            track={peer.cam}
                            debug
                        />
                        role: {peer.role}
                        <br />
                        Name: {peer.displayName?.split(',')?.[0]}
                    </>
                ))}
            {Object.values(peers)
                .filter((peer) => peer.mic)
                .map((peer) => (
                    <>
                        <Audio key={peer.peerId} peerId={peer.peerId} track={peer.mic} />
                    </>
                ))}
            <br />
            My stream
            <br />
            <video ref={videoRef} autoPlay muted></video>
        </div>
    )
}

export default VideoScreen
