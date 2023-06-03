'use strict';

const eventEmitter = require('../eventPool');

const Chance = require('chance');
const chance = new Chance();


function handleOrder(parcel = null) {
    if (!parcel) {
        parcel = {
            storeName: chance.animal() + " INC",
            customerName: chance.name({ nationality: "en" }),
            address: chance.address(),
            orderID: chance.bb_pin(),
        };
    }
    console.log('VENDOR: Order ready for pickup: ', parcel);
    eventEmitter.emit('pickup', parcel);
};


function handleThankyou(parcel) {
    console.log('VENDOR: Thank you for your order', parcel.orderID);
};


module.exports = { handleOrder, handleThankyou };
