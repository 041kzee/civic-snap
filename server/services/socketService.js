const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Initializes Socket.io with handshake authentication
 * @param {Object} server - HTTP Server instance
 */
const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', async (socket) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) throw new Error('No token provided');

      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decoded.id);
      
      if (!user) throw new Error('User not found');

      // Join specific user room and ward room
      socket.join(`user:${user._id}`);
      if (user.ward) {
        socket.join(`ward:${user.ward}`);
      }

      console.log(`[Socket] User ${user.name} connected to rooms user:${user._id} and ward:${user.ward}`);

    } catch (err) {
      console.error('[Socket Auth Error]:', err.message);
      socket.disconnect();
    }

    socket.on('disconnect', () => {
      console.log('[Socket] Client disconnected');
    });
  });

  return io;
};

const emitToUser = (io, userId, event, data) => {
  io.to(`user:${userId}`).emit(event, data);
};

const emitToWard = (io, ward, event, data) => {
  io.to(`ward:${ward}`).emit(event, data);
};

const emitToAll = (io, event, data) => {
  io.emit(event, data);
};

module.exports = { initSocket, emitToUser, emitToWard, emitToAll };
