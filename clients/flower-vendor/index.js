'use strict';
const { io } = require('socket.io-client');
const client = io('http://localhost:3002/caps');
const { handleOrder, handleThankyou } = require('./flower-handler');
const store = '1-206-flowers';


client.emit('join', store);
client.emit('getAll', { vendorID: store });

setInterval(() => {
    handleOrder(client);
}, 5000);


client.on('delivered', (parcel) => {
    setTimeout(() => {
        client.emit('recieved', parcel);
        handleThankyou(parcel);
    }, 1000);
});