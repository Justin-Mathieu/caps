'use strict';
require('dotenv').config();
const PORT = process.env.PORT
const { Server } = require('socket.io');
const server = new Server();


const caps = server.of('/caps');



caps.on('connection', (client) => {
    console.log('Connected to caps: ', client.id);



    // client.onAny((event, parcel) => {
    //     let time = Date(Date.now())
    //     console.log('EVENT: ', { event, time, parcel });
    // });

    // PICKUP
    client.on('pickup', (parcel) => {
        console.log('PICKUP: ', parcel);
        client.broadcast.emit('pickup', parcel)
    });

    //IN-TRANSIT
    client.on('in-transit', (parcel) => {
        console.log('IN-TRANSIT: ', parcel)
        client.broadcast.emit('in-transit', parcel);
    });

    //DELIVERED
    client.on('delivered', (parcel) => {
        console.log('DELIVERED: ', parcel);
        client.broadcast.emit('delivered', parcel);
    });


});

console.log('connected on port: ', PORT)
server.listen(PORT)








