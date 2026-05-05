import { create } from 'zustand';

const useNotificationStore = create((set, get) => ({
  unreadCount: 0,
  setUnreadCount: (count) => set({ unreadCount: count }),
  incrementUnread: () => set((state) => ({ unreadCount: state.unreadCount + 1 })),
  decrementUnread: () => set((state) => ({ unreadCount: Math.max(0, state.unreadCount - 1) })),
  resetUnread: () => set({ unreadCount: 0 }),
}));

export default useNotificationStore;
