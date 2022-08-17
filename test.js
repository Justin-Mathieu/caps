const event = require('./event.js');
const { vendorPackageReady, handleVendorDelivery, buildPackage } = require('./vendor.js');
const { handlePackageReady, handleDriverPickup, handleDriverDelivery } = require('./driver.js');


describe('Handlers', () => {


    it('emits for the next listener', () => {
        const spy = jest.spyOn(event, 'emit')
        vendorPackageReady()
        expect(spy).toHaveBeenCalledWith('vendor package ready', expect.objectContaining({
            event: "pickup ready",
            time: expect.any(String),
            payload: {
                store: expect.any(String),
                orderId: expect.any(String),
                customerName: expect.any(String),
                address: expect.any(String),

            }
        }))


    });


    it('console logs on the pickup and emits', () => {
        const consolesSpy = jest.spyOn(console, 'log');
        const emitSpy = jest.spyOn(event, 'emit');
        handleDriverPickup(buildPackage());
        expect(consolesSpy).toHaveBeenCalled();
        expect(emitSpy).toHaveBeenCalledWith('driver delivery ', expect.objectContaining({
            event: "in transit",
            time: expect.any(String),
            payload: {
                store: expect.any(String),
                orderId: expect.any(String),
                customerName: expect.any(String),
                address: expect.any(String),

            }
        }))
    })


    it('console.logs and emits for driver delvery', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        const emitSpy = jest.spyOn(event, 'emit');
        handleDriverDelivery(buildPackage());
        expect(consoleSpy).toHaveBeenCalled();
        expect(emitSpy).toHaveBeenCalledWith('vendor delivery', expect.objectContaining({
            event: "Delivered",
            time: expect.any(String),
            payload: {
                store: expect.any(String),
                orderId: expect.any(String),
                customerName: expect.any(String),
                address: expect.any(String),

            }
        }))

    });



    it('console logs on vendor delvery', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        handleVendorDelivery(buildPackage());
        expect(consoleSpy).toHaveBeenCalled();

    })








});




