'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;
const Queue = require('./queue');
const { Socket } = require('socket.io-client');
;
const server = new Server();


server.listen(PORT);

//Queues
const capsQ = new Queue()

//NameSpace
const caps = server.of('/caps');


caps.on('connection', (client) => {

    console.log('connected to name space: ', client.id)

    // ROOMS 
    client.on('join', (room) => {
        client.join(room);
        console.log(`${client.id} is Joining room: ${room}`)
    });

    // LOGGER
    client.onAny((event, parcel) => {
        let time = Date(Date.now());
        console.log(event, time);
    });

    //PICKUP
    client.on('pickup', (parcel) => {
        let driverQ = capsQ.read('driver');
        if (!driverQ) {
            let driverKey = capsQ.add('driver', new Queue());
            driverQ = capsQ.read(driverKey)
        }
        driverQ.add(parcel.payload.orderID, parcel);
        client.broadcast.emit('pickup', parcel);
    });

    //IN-TRANSIT
    client.on('in-transit', (parcel) => {
        client.broadcast.emit('in-transit', parcel)
    });

    // DELIVERED
    client.on('delivered', (parcel) => {
        let vendorQ = capsQ.read(parcel.vendorID);
        if (!vendorQ) {
            let vendorkey = capsQ.add(parcel.vendorID, new Queue());
            vendorQ = capsQ.read(vendorkey)
        }
        vendorQ.add(parcel.payload.orderID, parcel)
        client.broadcast.emit('delivered', parcel);
    });

    //GETALL
    client.on('getAll', (parcel) => {
        let currentQ = capsQ.read(parcel.vendorID);
        if (currentQ && currentQ.data) {
            const ID = Object.keys(currentQ.data);
            ID.forEach(messageId => {
                let storedParcel = currentQ.read(messageId);
                client.emit(storedParcel.event, storedParcel);
            })
        }
    });

    //RECIEVED
    client.on('recieved', (parcel) => {
        let currentQ = capsQ.read(parcel.vendorID);
        if (!currentQ) {
            throw new Error('NO QUEUE!')
        }
        currentQ.remove(parcel.orderID)
    })

});

console.log('SERVER PORT: ', PORT)
