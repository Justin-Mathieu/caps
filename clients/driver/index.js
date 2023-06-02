const { io } = require("socket.io-client");
const socket = io("ws://localhost:3001");
const { driverMessages, driverPickup } = require('./handler');

socket.on('connect', driverMessages())
socket.on('pickup request', driverPickup(parcel));
socket.on('delivered', driverDeliver(parcel));