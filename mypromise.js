// implement promises in javascript 
// implement a class that create a promise, utilizes the promise return then, catch, finally method. 

const PROMISE_STATE = {
    FULFILLED: 'fulfilled',
    PENDING: 'pending',
    REJECTED: 'rejected'
};

class MyPromise {
    thenCallbacks = [];
    catchCallbacks = [];
    state = PROMISE_STATE.PENDING;
    value = null;
    constructor(callback) {
        try {
            callback(this.#onSuccess.bind(this), this.#onFailure.bind(this))
        }
        catch(e) {
            this.#onFailure(e)
        }
    }

    runCallbacks() {
        if(this.state === PROMISE_STATE.FULFILLED) {
            this.thenCallbacks.forEach((callback) => callback(this.value));
            this.thenCallbacks = []
        }

        if(this.state === PROMISE_STATE.REJECTED) {
            this.catchCallbacks.forEach((callback) => callback(this.value));
            this.catchCallbacks = []
        }
    }


    #onSuccess(value) {
        if(this.state !== PROMISE_STATE.PENDING) return;
        this.value = value;
        this.state = PROMISE_STATE.FULFILLED;
        this.runCallbacks();
    } 

    #onFailure(value) {
        if(this.state !== PROMISE_STATE.PENDING) return;
        this.value = value;
        this.state = PROMISE_STATE.REJECTED;
        this.runCallbacks();
    }

    then(thenCb, catchCb) {
        if(thenCb != null) this.thenCallbacks.push(thenCb);
        if(catchCb != null) this.catchCallbacks.push(catchCb);
        this.runCallbacks();
    }

    catch(cb) {
        this.then(null, cb);
    }

    finally(cb) {

    }
}


const promise = new MyPromise((resolve, reject) => {
    if(true) {
        console.log("Resolved")
        resolve(true)
    }
    else {
        console.log("Rejected")
        reject(false)
    }
})


promise.then((res) => console.log("Promise 1", res))
promise.then((res) => console.log("Promise 2", res))
promise.then((res) => console.log("Promise 3", res))