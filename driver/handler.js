'use strict';
const eventEmitter = require('../eventPool');

function handlePickup(parcel) {
    console.log(`DRIVER: Order ${parcel.orderID} has been picked up`);
    eventEmitter.emit('in-transit', parcel);
};

function handleDelivery(parcel) {
    console.log(`DRIVER: Order ${parcel.orderID} has been delivered`);
    eventEmitter.emit('delivered', parcel);
};


module.exports = { handlePickup, handleDelivery };
