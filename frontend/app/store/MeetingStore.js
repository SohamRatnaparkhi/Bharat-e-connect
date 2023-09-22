import { create } from "zustand";

export const useMeetingStore = create((set) => ({
    roomId: null,
    setRoomId: (roomId) => set({ roomId }),
    hostAddresses: [],
    addHostAddress: (hostAddress) => set((state) => ({ hostAddresses: [...state.hostAddresses, hostAddress] })),
    removeHostAddress: (hostAddress) => set((state) => ({ hostAddresses: state.hostAddresses.filter((address) => address !== hostAddress) })),
    peers: [],
    /*
    type peer = {
        peerId: string,
        displayName: string,
        address: string,
        isMuted: boolean,
    */
    addPeer: (peer) => set((state) => ({ peers: [...state.peers, peer] })),
    removePeer: (peerId) => set((state) => ({ peers: state.peers.filter((peer) => peer.peerId !== peerId) })),
    updatePeerName: (peerId, displayName) => set((state) => ({ peers: state.peers.map((peer) => peer.peerId === peerId ? { ...peer, displayName } : peer) })),
    muteOnJoin: null,
    setMuteOnJoin: (muteOnJoin) => set({ muteOnJoin }),
    disableVideoOnJoin: null,
    setDisableVideoOnJoin: (disableVideoOnJoin) => set({ disableVideoOnJoin }),
    isMuteLocked: false,
    setIsMuteLocked: (isMuteLocked) => set({ isMuteLocked }),
    isVideoLocked: false,
    setIsVideoLocked: (isVideoLocked) => set({ isVideoLocked }),
    isChatLocked: false,
    setIsChatLocked: (isChatLocked) => set({ isChatLocked }),
    roomMessages: [],
    /*
    type roomMessage = {
        sender: string,
        recipient: string,
        message: string,
        timestamp: number,
    }
    */
    addRoomMessage: (roomMessage) => set((state) => ({ roomMessages: [...state.roomMessages, roomMessage] })),
    screenShareRef1: null,
    setScreenShareRef1: (screenShareRef1) => set({ screenShareRef1 }),
    roomPeerRoles: [],
    /**
    {
        role: [peerId1, peerId2, ...]
    }
     */
    addPeerToRole: (role, peerId) => set((state) => {
        const newRoomPeerRoles = { ...state.roomPeerRoles };
        if (!newRoomPeerRoles[role]) {
            newRoomPeerRoles[role] = [];
        }
        newRoomPeerRoles[role].push(peerId);
        return { roomPeerRoles: newRoomPeerRoles };
    }),
    removePeerFromRole: (role, peerId) => set((state) => {
        const newRoomPeerRoles = { ...state.roomPeerRoles };
        if (!newRoomPeerRoles[role]) {
            newRoomPeerRoles[role] = [];
        }
        newRoomPeerRoles[role] = newRoomPeerRoles[role].filter((id) => id !== peerId);
        return { roomPeerRoles: newRoomPeerRoles };
    }),
}));

export const useMeStore = create((set) => ({
    myPeerId: null,
    setMyPeerId: (myPeerId) => set({ myPeerId }),
    isMuted: false,
    setIsMuted: (isMuted) => set({ isMuted }),
    isVideoDisabled: false,
    setIsVideoDisabled: (isVideoDisabled) => set({ isVideoDisabled }),
    isScreenSharing: false,
    setIsScreenSharing: (isScreenSharing) => set({ isScreenSharing }),
    isHandRaised: false,
    setIsHandRaised: (isHandRaised) => set({ isHandRaised }),
    displayName: null,
    setDisplayName: (displayName) => set({ displayName }),
    isHost: false,
    setIsHost: (isHost) => set({ isHost }),
    myEthAddress: null,
    setMyEthAddress: (myEthAddress) => set({ myEthAddress }),
}));