const event = require('./event.js');
const { vendorPackageReady, buildPackage } = require('./vendor.js');
const { handlePackageReady, handleDriverPickup, handleDriverDelivery } = require('./driver.js');


describe('Handlers', () => {


    it.skip('emits for the next listener', () => {
        const spy = jest.spyOn(socket, 'emit')
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


    it.skip('console logs on the pickup and emits', () => {
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


    it.skip('console.logs and emits for driver delvery', () => {
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



    it.skip('console logs on vendor delvery', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        handleVendorDelivery(buildPackage());
        expect(consoleSpy).toHaveBeenCalled();

    })


    // Tests for lab 12 (skipped the old tests)
    describe('socket io', () => {
        const { io } = require("socket.io-client");
        const socket = io("ws://localhost:3001");


        it.skip('console logs on the start of the vendor connection', () => {
            const consoleSpy = jest.spyOn(console, 'log');
            socket.emit('vendor package ready', buildPackage());
            expect(consoleSpy).toHaveBeenCalled();
        });



        it.skip('console logs on the pick up', () => {
            const consoleSpy = jest.spyOn(console, 'log');
            socket.emit('picked up', buildPackage());
            expect(consoleSpy).toHaveBeenCalled();
        });




        it.skip('console logs on the delivery', () => {
            const consoleSpy = jest.spyOn(console, 'log');
            socket.emit('driver delivery', buildPackage());
            expect(consoleSpy).toHaveBeenCalled();
        });



    });


})











