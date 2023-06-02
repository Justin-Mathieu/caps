const Chance = require('chance');
const chance = new Chance();

//----Vendor Handlers----
//Creating multiple packages for simulation
function buildPackage(store) {
    return {
        status: "pickup ready",
        time: Date(Date.now()),
        payload: {
            store: store,
            orderId: chance.bb_pin(),
            customerName: chance.name({ nationality: "en" }),
            address: chance.address(),
        }
    }

}

// ----Driver Handlers----
//Building Drivers to deliver packages.
function driverBuild(driver) {
    if (driver === undefined) {
        return {
            name: chance.name({ nationality: "en" })
        }
    } else {
        return {
            name: driver,
            available: true
        }
    }
}

module.exports = { buildPackage, driverBuild };