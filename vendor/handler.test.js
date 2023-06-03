'use strict';

const eventEmitter = require('../eventPool');
const { handleOrder, handleThankyou } = require('./handler');

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

describe('vendor handlers', () => {

    test('order handler log and emit', () => {

        handleOrder(testParcel);
        expect(consoleSpy).toHaveBeenCalledWith('VENDOR: Order ready for pickup: ', testParcel);
        expect(eventEmitter.emit).toHaveBeenCalledWith('pickup', testParcel);
    });

    test('Thank you handler log and emit', () => {

        handleThankyou(testParcel);
        expect(consoleSpy).toHaveBeenCalledWith('VENDOR: Thank you for your order', testParcel.orderID);
    });

});
