'use strict';
const { io } = require('socket.io-client');
const client = io('http://localhost:3002/caps');
const { handleOrder, handleThankyou } = require('./widget-handler');
const store = 'acme-widgets'

client.emit('join', store);
client.emit('getAll', { vendorID: store });

setInterval(() => {
    handleOrder(client);
}, 5000);


client.on('delivered', (parcel) => {
    setTimeout(() => {
        handleThankyou(parcel);
        client.emit('recieved', parcel);

    }, 1000);
});