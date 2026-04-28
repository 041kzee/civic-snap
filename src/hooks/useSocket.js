import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import useAuthStore from '../store/authStore';

const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (token) {
      const newSocket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000', {
        auth: { token },
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
  }, [token]);

  return socket;
};

export default useSocket;
