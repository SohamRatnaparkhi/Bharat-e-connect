import React from 'react'
import { Audio, Video, } from "@huddle01/react/components";

const VideoScreen = ({ peers }) => {
    console.log(peers)
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
        </div>
    )
}

export default VideoScreen
