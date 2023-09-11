import { useHuddle01 } from '@huddle01/react';
import { ENV } from '../constants/EnvVars';


const initHuddle = () => {
    const { initialize, isInitialized, me, roomState } = useHuddle01();
    const { NEXT_PUBLIC_PROJECT_ID } = ENV
    if (!isInitialized && initialize.isCallable) {
        initialize(NEXT_PUBLIC_PROJECT_ID || "")
    }
    return { isInitialized, roomState, me }
}

const getPeer = (peerId, peers) => {
    return peers[peerId]
}

export {
    initHuddle,
    getPeer,
}