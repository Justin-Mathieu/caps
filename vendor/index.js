'use strict';

const { handleOrder, handleThankyou } = require('./handler');
const eventEmitter = require('../eventPool');

setInterval(() => {
    handleOrder()
}, 7000);

eventEmitter.on('delivered', (parcel) => {
    setTimeout(() => {
        handleThankyou(parcel);
    }, 1000);

});