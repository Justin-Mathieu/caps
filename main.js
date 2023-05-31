const event = require('./event.js');

const { vendorPackageReady, handleVendorDelivery } = require('./vendor');
const { handlePackageReady, handleDriverPickup, handleDriverDelivery } = require('./driver');

// function setupListeners() {
// start, vendor says its ready
event.on('vendor package ready', handlePackageReady)
// driver pick up package
event.on('driver pickup parcel', handleDriverPickup)
// driver deliver
event.on('driver delivery', handleDriverDelivery)
// vendor acknowledge delivery
event.on('vendor delivery', handleVendorDelivery)
// }

// setupListeners();

vendorPackageReady();