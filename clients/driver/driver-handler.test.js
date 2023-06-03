'use strict';;
let socket = require('../../socket');
const { handlePickup, handleDelivery } = require('./handler');

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

describe('driver handlers', () => {

    test('order pickup handler log and emit', () => {

        handlePickup(socket, testParcel);
        expect(consoleSpy).toHaveBeenCalledWith(`DRIVER: Order ${testParcel.payload.orderID} has beed picked up`);
        expect(socket.emit).toHaveBeenCalledWith('in-transit', testParcel);
    });

    test('delivery handler log and emit', () => {

        handleDelivery(socket, testParcel);
        expect(consoleSpy).toHaveBeenCalledWith(`DRIVER: Order ${testParcel.payload.orderID} has been delivered`);
        expect(socket.emit).toHaveBeenCalledWith('delivered', testParcel);

    });
});