'use strict';
const eventEmitter = require('../eventPool');
const { handleDelivery, handlePickup } = require('./handler');

eventEmitter.on('pickup', (parcel) => {
    setTimeout(() => {
        handlePickup(parcel);

    }, 3000);

    setTimeout(() => {

        handleDelivery(parcel);

    }, 5000);
});