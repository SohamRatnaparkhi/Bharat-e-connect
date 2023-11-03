import { create } from 'zustand';

export const useVRStore = create((set) => ({

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