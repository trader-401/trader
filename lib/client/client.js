'use strict';

const inquirer = require('inquirer');
const io = require('socket.io-client');
//connect to client
const client = io.connect('http://localhost/');

client.on('connect', () => {
  const messages = [];
  let name = '';
  let firstUser = '';
  let secondUser = '';
  let token = '55555';
  let activeInput = true;
  let room = 'general';/////////////////
  getName();

  // emit join event that client app in server is listining to
  client.emit('joinRoom',{ firstUser,secondUser,token });
  client.on('joined', (joinedRoom) => {
    room = joinedRoom;
    getInput();
  });
  client.on('message', (payload) => {
    console.clear();
    messages.push(payload);
    messages.forEach((message) => console.log(message));
    console.log('');
    getInput();
  });


  async function getInput() {
    if (activeInput) {
      return;
    }
    activeInput = true;
    const response = await inquirer.prompt([
      {
        prefix: '',
        name: 'text',
        message: `----------------\n ${room}`,
      },
    ]);

    // Join room
    const command = response.text.toLowerCase().split(' ')[0];
    const room = response.text.toLowerCase().split(' ')[1];
    switch (command) {
    case 'quit':
      process.exit();
      break;
    // case 'join':
    //   activeInput = false;
    //   client.emit('join', room);
    //   break;
    default:
      activeInput = false;
      client.emit('chatMessage', response.text);
      getInput();
      break;
    }
  }


  async function getName() {
    console.clear();
    const firstInput = await inquirer.prompt([
      { name: 'firstUser', message: 'msg' },
    ]);
    firstUser = firstInput.name;
    const secondInput = await inquirer.prompt([
      { name: 'secondUser', message: 'msg' },
    ]);
    secondUser = secondInput.name;
    activeInput = false;
    getInput();
  }
  // getName();
});