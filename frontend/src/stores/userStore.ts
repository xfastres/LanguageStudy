import { create } from 'zustand';
import type { User, UserAcquisitionProfile } from '../types';

interface UserState {
  profile: User | null;
  acquisitionProfile: UserAcquisitionProfile | null;
  isLoading: boolean;
  setProfile: (profile: User) => void;
  setAcquisitionProfile: (profile: UserAcquisitionProfile) => void;
  clear: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  acquisitionProfile: null,
  isLoading: false,

  setProfile: (profile) => set({ profile }),
  setAcquisitionProfile: (acquisitionProfile) => set({ acquisitionProfile }),
  clear: () => set({ profile: null, acquisitionProfile: null }),
}));
