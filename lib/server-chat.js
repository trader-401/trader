'use strict';
/**
 * @module server
 * @exports expres 
 * @exports morgan
 * @exports cors
 * @exports middleware
 */
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const room = require('./models/rooms-model');

const api = require('./routes/api');
const userRoute = require('./routes/user-route');
const postRoute=require('./routes/post-route.js');

const logRequest = require('./middleware/logger.js');
const timeRequest = require('./middleware/timestamp.js');
const notFound = require('./middleware/404.js');
const serverError = require('./middleware/500.js');
const app = express();
const server = http.Server(app);
const io = socketio(server);
const formatMessage = require('../lib/middleware/messages');
// const { connect } = require('http2');

// global middleware
app.use(express.static('./public'));
app.use('/docs', express.static('./docs'));
app.use(express.json()); //body-parser to add body to the req
app.use(morgan('dev'));
app.use(cors());
app.use(timeRequest);
app.use(logRequest);


//global middleware                                               
const botName = 'trader';

// Run when client connects
io.on('connection', socket => {
  console.log('new connection',socket.id);
  socket.on('joinRoom', ({ firstUser,secondUser,token }) => {
    console.log('clint joined room',socket.id);
    const user = room.userJoin(firstUser,secondUser);
    if (user.firstUser==firstUser){
      user.firstSocket=socket.id;
    }else{
      user.secondSocket=socket.id;
    }
    room.update(user.id,user);
    socket.join(user.id);
    socket.emit('joined', (user.id)); //emitting the client room
    // Welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.id)
      .emit(
        'message',
        formatMessage(botName, `${user.firstUser} is online`),
      );

    // Send users and room info
    io.to(user.id).emit('roomUsers', {
      room: user.id,
      users: room.get(user.room),
    });
  });

  // Listen for chatMessage
  socket.on('chatMessage', msg => {
    const user = room.get({$or:[{firstSocket:socket.id},{secondSocket:socket.id}]});

    io.to(user.id).emit('message', formatMessage(user.firstSocket==socket.id?user.firstUser:user.secondUser, msg));
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = room.get({$or:[{firstSocket:socket.id},{secondSocket:socket.id}]});

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.firstSocket==socket.id?user.firstUser:user.secondUser} user is offline right now`),
      );

      // Send users and room info
      io.to(user.id).emit('roomUsers', {
        room: user.id,
        users: room.get(user.id),
      });
    }
  });
});


// categories
app.use('', userRoute);
app.use('', api);
app.use('',postRoute);


/**
 * @
 */
app.use('*', notFound);
app.use(serverError);

module.exports = {
  server: server,
  start: (port) => {
    const PORT = port|| 3000;
    server.listen(PORT, () => console.log(`Listening on ${PORT}`));
  },
};
