import { create } from 'zustand';

export const useVRStore = create((set) => ({

    me: null,
    setMe: (me) => set({ me }),

    myAnimation: 'sitting-idle',
    setMyAnimation: (myAnimation) => set({ myAnimation }),  
    
    peers: [],

    isHeadFollow: false,
    setIsHeadFollow: (isHeadFollow) => set(() => ({ isHeadFollow: isHeadFollow })),

    myPosition: null,
    setMyPosition: (myPosition) => set({ myPosition }),

    occupiedPositions: new Array(10).fill(false),
    
    toggleOccupiedPosition: (position) => set((state) => {
        const newOccupiedPositions = [...state.occupiedPositions];
        newOccupiedPositions[position] = !newOccupiedPositions[position];
        return { occupiedPositions: newOccupiedPositions };
    }),

    charaters: [],
    addCharacter: (character) => set((state) => ({ characters: [...state.characters, character] })),

}));