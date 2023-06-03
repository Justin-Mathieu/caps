'use strict';

function handlePickup(client, parcel) {
    console.log(`DRIVER: Order ${parcel.payload.orderID} has beed picked up`);
    client.emit('in-transit', parcel)
};

function handleDelivery(client, parcel) {
    console.log(`DRIVER: Order ${parcel.payload.orderID} has been delivered`);
    client.emit('delivered', parcel)
}


module.exports = { handlePickup, handleDelivery };
