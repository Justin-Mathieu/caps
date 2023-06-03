const { io } = require("socket.io-client");
const client = io('http://localhost:3002/caps');
const { handlePickup, handleDelivery } = require('./handler');

client.emit('getAll', { vendorID: 'driver' });

client.on('pickup', (parcel) => {
    setTimeout(() => {
        handlePickup(client, parcel);
    }, 5000);

    setTimeout(() => {
        handleDelivery(client, parcel);
    }, 1000);
    client.emit('recieved', { vendorID: 'driver', orderID: parcel.payload.orderID });
});