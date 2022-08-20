const { io } = require("socket.io-client");
const socket = io("ws://localhost:3001");

const Chance = require('chance');
const chance = new Chance();

function buildPackage() {
    return {
        event: "pickup ready",
        time: Date(Date.now()),
        payload: {
            store: chance.animal() + " INC",
            orderId: chance.bb_pin(),
            customerName: chance.name({ nationality: "en" }),
            address: chance.address(),

        }
    }
}



function vendorPackageReady() {
    const packageToSend = buildPackage();
    socket.timeout(2000).emit('vendor package ready', packageToSend);
    // console.log(`EVENT: ${packageToSend}`)
}

socket.on('vendor delivery notice', (parcel) => {
    console.log(`VENDOR: Thank you for delivering ${parcel.payload.orderId}`)
})



vendorPackageReady()


module.exports = { buildPackage };