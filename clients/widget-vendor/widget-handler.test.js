'use strict';;
let socket = require('../../socket');
const { handleThankyou, handleOrder } = require('./widget-handler');

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
        orderID: 'fa6f2d7f',
        customerName: 'Polly Reeves',
        address: '1283 Rusce Ridge',
    },
}

beforeAll(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();

});

afterAll(() => {
    consoleSpy.mockRestore();
});

describe('widget-vendor handlers', () => {

    test('order handler log and emit', () => {

        handleOrder(socket, testParcel);
        expect(consoleSpy).toHaveBeenCalledWith('VENDOR: pickup order: ', testParcel);
        expect(socket.emit).toHaveBeenCalledWith('pickup', testParcel);
    });

    test('Thank you handler log and emit', () => {

        handleThankyou(testParcel);
        expect(consoleSpy).toHaveBeenCalledWith(`VENDOR: Thank you for your order ${testParcel.payload.orderID}`);
    });
});