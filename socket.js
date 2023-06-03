'use strict';

const { io } = require('socket.io-client')
const client = io('http://localhost:3001/caps');

module.exports = client;
