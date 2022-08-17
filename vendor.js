const event = require('./event.js')
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
    event.emit('vendor package ready', packageToSend);
    // console.log(`EVENT: ${packageToSend}`)
}

function handleVendorDelivery(parcel) {
    console.log(`VENDOR: Thank you for delivering ${parcel.payload.orderId}`)
    console.log(parcel);
}

module.exports = { vendorPackageReady, handleVendorDelivery, buildPackage };