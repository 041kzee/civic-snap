import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      role: null, // 'citizen' or 'authority'
      token: null,
      setUser: (user, role, token) => set({ user, role, token }),
      logout: () => set({ user: null, role: null, token: null }),
    }),
    {
      name: 'civic-snap-auth',
    }
  )
);

export default useAuthStore;
