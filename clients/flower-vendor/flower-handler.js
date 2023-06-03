const Chance = require('chance');
const chance = new Chance();
const store = '1-206-flowers';

function handleOrder(client, parcel = null) {
    if (!parcel) {
        parcel = {
            event: "pickup ready",
            time: Date(Date.now()),
            payload: {
                vendorID: store,
                orderID: chance.bb_pin(),
                customerName: chance.name({ nationality: "en" }),
                address: chance.address(),
            },
        }


    }
    console.log('VENDOR: pickup order: ', parcel);
    client.emit('pickup', parcel);
}

function handleThankyou(parcel) {
    console.log(`VENDOR: thank you for your order ${parcel.payload.orderID}`)
}

module.exports = { handleOrder, handleThankyou };
