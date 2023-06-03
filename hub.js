'use strict';

const eventPool = require('./eventPool');
require('./vendor');
require('./driver');

eventPool.on('pickup', (parcel) => {
    console.log('PICKUP:', Date(Date.now()), parcel);
});

eventPool.on('in-transit', (parcel) => {
    console.log('IN-TRANSIT:', Date(Date.now()), parcel);
});

eventPool.on('delivered', (parcel) => {
    console.log('DELIVERED:', Date(Date.now()), parcel);
});