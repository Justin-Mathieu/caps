const event = require('./event.js');

function handlePackageReady(parcel) {
    console.log(parcel)

    event.emit('driver pickup parcel', parcel)

}

function handleDriverPickup(parcel) {
    parcel.event = "in transit"
    parcel.time = Date(Date.now());
    console.log(`DRIVER: Order ${parcel.payload.orderId} has been picked up`)
    console.log(parcel);
    event.emit('driver delivery', parcel);
}

function handleDriverDelivery(parcel) {
    parcel.time = Date(Date.now())
    parcel.event = "Delivered"
    console.log(`DRIVER: Order ${parcel.payload.orderId} has been delivered`)

    event.emit('vendor delivery', parcel);
}

module.exports = { handlePackageReady, handleDriverPickup, handleDriverDelivery };