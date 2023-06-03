'use strict';;
let socket = require('../../socket');
const { handleThankyou, handleOrder } = require('./flower-handler');

jest.mock('../../socket', () => {
    return {
        on: jest.fn(),
        emit: jest.fn(),
    };
});

let consoleSpy;


let testParcel = {
    event: "pickup",
    time: 'test',
    payload: {
        vendorID: 'store name',
        orderID: 'f7da4810',
        customerName: 'Jayden Watson',
        address: '1748 Cepav Parkway',
    }
}

beforeAll(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();

});

afterAll(() => {
    consoleSpy.mockRestore();
});

describe('flower-vendor handlers', () => {

    test('order handler log and emit', () => {

        handleOrder(socket, testParcel);
        expect(consoleSpy).toHaveBeenCalledWith('VENDOR: pickup order: ', testParcel);
        expect(socket.emit).toHaveBeenCalledWith('pickup', testParcel);
    });

    test('Thank you handler log and emit', () => {

        handleThankyou(testParcel);
        expect(consoleSpy).toHaveBeenCalledWith(`VENDOR: thank you for your order ${testParcel.payload.orderID}`);
    });
});