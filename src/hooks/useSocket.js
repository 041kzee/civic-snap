import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import useAuthStore from '../store/authStore';

const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (!token) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      return;
    }

    const newSocket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000', {
      auth: { token },
      transports: ['websocket'],
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [token]);

  return socket;
};

export default useSocket;
