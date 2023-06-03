'use strict';

const eventEmitter = require('../eventPool');
const { handlePickup, handleDelivery } = require('./handler');

jest.mock('../eventPool', () => {
    return {
        on: jest.fn(),
        emit: jest.fn(),
    };
});

let consoleSpy;


let testParcel = {
    storeName: 'Walmart',
    customerName: 'Bob',
    address: '42 Wallaby way, Sydney',
    orderID: 8675309,
};

beforeAll(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();

});

afterAll(() => {
    consoleSpy.mockRestore();
});

describe('Driver handlers', () => {

    test('Pickup handler log and emit', () => {

        handlePickup(testParcel);
        expect(consoleSpy).toHaveBeenCalledWith(`DRIVER: Order ${testParcel.orderID} has been picked up`);
        expect(eventEmitter.emit).toHaveBeenCalledWith('in-transit', testParcel);
    });

    test('Delivery handler log and emit', () => {

        handleDelivery(testParcel);
        expect(consoleSpy).toHaveBeenCalledWith(`DRIVER: Order ${testParcel.orderID} has been delivered`);
        expect(eventEmitter.emit).toHaveBeenCalledWith('delivered', testParcel);
    });

});