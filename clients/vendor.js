const { io } = require("socket.io-client");
const socket = io("ws://localhost:3001");

const Chance = require('chance');
const { buildPackage } = require("../server/handlers");
const chance = new Chance();

//recieve start signal -> send packages
socket.on('connect', () => {
    interval = setInterval(() => {
        let parcel1 = buildPackage('acme-widgets')
        socket.emit('vendor package ready', parcel1);
    }, 10000)
    setTimeout(() => {
        interval2 = setInterval(() => {
            let parcel2 = buildPackage('1-800-flowers')
            socket.emit('vendor package ready', parcel2);
        }, 10000)
    }, 30000)
})



//Recieves history of deliveries
socket.on('Log of deliveries', (log) => {
    console.log(log)
})


//recieve confirmation archive package
socket.on('vendor confirmation', (message) => {
    console.log(message)
});



