class Queue {
    constructor() {
        this.data = {};
    }

    read(key) {
        return this.data[key];
    }

    add(key, value) {
        this.data[key] = value;
        console.log('Added to Queue')
        return key;
    }

    remove(key) {
        let value = this.data[key];
        delete this.data[key]
        console.log('removed from Queue')
        return value;
    }

}

module.exports = Queue;