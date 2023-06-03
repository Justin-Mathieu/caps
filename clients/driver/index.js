const { io } = require("socket.io-client");
const client = io("http://localhost:3002/caps");

// HANDLERS
const { handlePickup, handleDelivery } = require('./handler')

client.on('pickup', (parcel) => {
    setTimeout(() => {
        handlePickup(client, parcel);
    }, 3000);

    setTimeout(() => {
        handleDelivery(client, parcel);
    }, 1000)
});