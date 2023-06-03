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
    status: "pickup",
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

describe('Driver handlers', () => {

    test('Pickup handler log and emit', () => {

        handlePickup(socket, testParcel);
        expect(consoleSpy).toHaveBeenCalledWith(`DRIVER: Order ${testParcel.payload.orderID} has been picked up`);
        expect(socket.emit).toHaveBeenCalledWith('in-transit', testParcel);
    });

    test('Delivered handler log and emit', () => {

        handleDelivery(socket, testParcel);
        expect(consoleSpy).toHaveBeenCalledWith(`DRIVER: Order ${testParcel.payload.orderID} has been delivered`);
        expect(socket.emit).toHaveBeenCalledWith('delivered', testParcel);

    });
});