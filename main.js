const event = require('./event.js');

const { vendorPackageReady, handleVendorDelivery } = require('./vendor');
const { handlePackageReady, handleDriverPickup, handleDriverDelivery } = require('./driver');

function setupListeners() {
    // start, vendor says its ready
    event.addListener('vendor package ready', handlePackageReady)
    // driver pick up package
    event.addListener('driver pickup package', handleDriverPickup)
    // driver deliver
    event.addListener('driver delivery', handleDriverDelivery)
    // vendor acknowledge delivery
    event.addListener('vendor delivery', handleVendorDelivery)
}

setupListeners();

vendorPackageReady();