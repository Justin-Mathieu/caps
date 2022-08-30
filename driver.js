const { io } = require("socket.io-client");
const socket = io("ws://localhost:3001");
const { driverBuild } = require('./handlers');

// Queues 
const driverRoster = [];


socket.on('connect', () => {
    interval = setInterval(() => {
        let driver = driverBuild()
        driverRoster.push(driver);
        console.log(driverRoster)
    }, 1000)

})

//recieve package queue -> sends confirmation -> sends pickup notice with date/time
socket.on('pickup request', (parcel) => {
    parcel.time = Date(Date.now())
    parcel.status = 'In transit'
    parcel.payload.driver = driverRoster[0].name
    socket.emit('picked up', parcel);


});


//recieve confirmation from pickup event -> sends delivered notice 
socket.on('delivered', (parcel) => {
    parcel.status = 'Delivered'
    parcel.time = Date(Date.now());
    driverRoster.push(driverBuild(parcel.payload.driver))
    console.log(`DRIVER: Order ${parcel.payload.orderId} has been delivered`)
    socket.emit('driver delivered', parcel);
});


