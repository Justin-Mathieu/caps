'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3001;
const Queue = require('./queue');
const server = new Server();


server.listen(PORT);

//Queues
const requestQueue = new Queue;
const deliveredLog = new Queue;

const caps = server.of('/caps');


caps.on('connection', (client) => {
    console.log('connected: ', client.id)

    client.emit('Log of deliveries', deliveredLog)



    // recieve the vendor package -> send the confirmation and add it to the queue
    client.on('vendor package ready', (parcel) => {
        requestQueue.push(parcel);
        console.log(requestQueue)
        const message = `Your request has been recieved. Your tracking number is(${parcel.payload.orderId})`
        for (let i = 0; i < requestQueue.length; i++) {
            io.emit('vendor confirmation', message)
            io.emit('pickup request', requestQueue[i]);
        }

    })






    //driver picked up package and is in transit.
    client.on('picked up', (parcel) => {
        console.log(parcel)
        const message = (` your order (${parcel.payload.orderId}) has been picked up for delivery on:${parcel.time} by ${parcel.payload.driver}`)
        io.emit('vendor confirmation', message)
        io.emit('delivered', parcel)
    });


    //driver has delivered package -> remove it fromn queue and add it to history -> send confirmation message
    client.on('driver delivered', (parcel) => {
        console.log(parcel)
        deliveredLog.push({
            "Order": parcel.payload.orderId,
            "Status": parcel.status,
            "Driver": parcel.payload.driver

        })
        const message = (`Your package(${parcel.payload.orderId}) has been delivered at ${parcel.time} by ${parcel.payload.driver}`)
        io.emit('vendor confirmation', message)
        requestQueue.shift()

    });


});
