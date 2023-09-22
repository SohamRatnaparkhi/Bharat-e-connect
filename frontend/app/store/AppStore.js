import { create } from "zustand";
import { persist } from 'zustand/middleware'

export const useAppStore = create(
    persist(
        (set) => ({
            login: false,
            setLogin: (login) => set({ login }),
            user: null,
            setUser: (user) => set({ user }),
        }),
        { name: 'global', getStorage: () => localStorage }
    )
);