const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

const users = new Map();
const rooms = new Map();

io.on('connection', (socket) => {
  console.log('Bir kullanıcı bağlandı');

  socket.on('join', (username) => {
    users.set(socket.id, username);
    io.emit('userList', Array.from(users.values()));
    socket.broadcast.emit('userJoined', username);
  });

  socket.on('createRoom', (roomName) => {
    socket.join(roomName);
    if (!rooms.has(roomName)) {
      rooms.set(roomName, new Set([socket.id]));
    } else {
      rooms.get(roomName).add(socket.id);
    }
    io.emit('roomList', Array.from(rooms.keys()));
  });

  socket.on('joinRoom', (roomName) => {
    socket.join(roomName);
    if (rooms.has(roomName)) {
      rooms.get(roomName).add(socket.id);
    }
    socket.to(roomName).emit('userJoinedRoom', users.get(socket.id));
  });

  socket.on('message', (data) => {
    if (data.room) {
      socket.to(data.room).emit('message', {
        user: users.get(socket.id),
        message: data.message,
        timestamp: new Date()
      });
    }
  });

  socket.on('disconnect', () => {
    const username = users.get(socket.id);
    users.delete(socket.id);
    
    rooms.forEach((userSet, roomName) => {
      if (userSet.has(socket.id)) {
        userSet.delete(socket.id);
        if (userSet.size === 0) {
          rooms.delete(roomName);
        }
      }
    });

    io.emit('userList', Array.from(users.values()));
    io.emit('roomList', Array.from(rooms.keys()));
    io.emit('userLeft', username);
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
}); 