const { io } = require("socket.io-client");
const socket = io("ws://localhost:3001");
const { driverBuild } = require('../../server/handlers');

// Queues 
const driverRoster = []



function driverMessages() {

    socket.emit('driver-message')
    interval = setInterval(() => {
        let driver = driverBuild()
        driverRoster.push(driver);

    }, 10000)
}

function recieved(logQueue) {
    console.log(logQueue)
}


//recieve package queue -> sends confirmation -> sends pickup notice with date/time

function driverPickup(parcel) {
    parcel.time = Date(Date.now())
    parcel.status = 'In transit'
    parcel.payload.driver = driverRoster[0].name
    socket.emit('picked up', parcel);


}


function driverDeliver(parcel) {
    parcel.status = 'Delivered'
    parcel.time = Date(Date.now());
    driverRoster.push(driverBuild(parcel.payload.driver))
    console.log(`DRIVER: Order ${parcel.payload.orderId} has been delivered`)
    socket.emit('driver delivered', parcel);
}


//recieve confirmation from pickup event -> sends delivered notice 
socket.on('delivered', driverDeliver(parcel))




module.exports = { driverMessages, driverPickup, recieved }