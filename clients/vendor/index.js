const { io } = require("socket.io-client");
const client = io("http://localhost:3002/caps");

// HANDLERS
const { handleOrder, handleThankyou } = require('./handler')


setInterval(() => {
    handleOrder(client);
}, 3000);

client.on('delivered', (parcel) => {
    setTimeout(() => {
        handleThankyou(parcel);
    }, 1000)
});