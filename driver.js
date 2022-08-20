const { io } = require("socket.io-client");
const socket = io("ws://localhost:3001");



socket.on('pickup', (parcel) => {
    console.log('pickup emit')
    parcel.event = "in transit"
    parcel.time = Date(Date.now());
    console.log(`DRIVER: Order ${parcel.payload.orderId} has been picked up`)
    socket.emit('picked up', parcel);


});



socket.on('delivered', (parcel) => {
    parcel.event = "delivered"
    parcel.time = Date(Date.now());
    console.log(`DRIVER: Order ${parcel.payload.orderId} has been delivered`)
    socket.emit('driver delivered', parcel);
});


