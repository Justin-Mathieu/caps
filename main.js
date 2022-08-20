const { Server } = require('socket.io');
const io = new Server(3001);

// function setUp() {
io.on('connection', (client) => {
    // start, vendor says its ready
    client.on('vendor package ready', (parcel) => {
        console.log('first emit: ', parcel);
        io.emit('pickup', parcel);

    });


    client.on('picked up', (parcel) => {
        console.log(parcel)
        io.emit('delivered', parcel)
    });


    client.on('driver delivered', (parcel) => {
        console.log(parcel)
        io.emit('vendor delivery notice', parcel)
    });


})
// }

// setUp();

