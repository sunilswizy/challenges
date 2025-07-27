// implement promises in javascript 
// implement a class that create a promise, utilizes the promise return then, catch, finally method. 

const PROMISE_STATE = {
    FULFILLED: 'fulfilled',
    PENDING: 'pending',
    REJECTED: 'rejected'
};

class MyPromise {
    #thenCallbacks = [];
    #catchCallbacks = [];
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

    #runCallbacks() {
        if(this.state === PROMISE_STATE.FULFILLED) {
            this.#thenCallbacks.forEach((callback) => callback(this.value));
            this.#thenCallbacks = []
        }

        if(this.state === PROMISE_STATE.REJECTED) {
            this.#catchCallbacks.forEach((callback) => callback(this.value));
            this.#catchCallbacks = []
        }
    }


    #onSuccess(value) {
        queueMicrotask(() => {
             if(this.state !== PROMISE_STATE.PENDING) return;

            if(value instanceof MyPromise) {
                value.then(this.#onSuccess.bind(this), this.#onFailure.bind(this));
                return;
            }

            this.value = value;
            this.state = PROMISE_STATE.FULFILLED;
            this.#runCallbacks();
        })
    }

    #onFailure(value) {
        queueMicrotask(() => {
            if(this.state !== PROMISE_STATE.PENDING) return;

            if(value instanceof MyPromise) {
                value.then(this.#onSuccess.bind(this), this.#onFailure.bind(this));
                return;
            }

            if(this.#catchCallbacks.length === 0) {
                throw new UnCaughtPromiseError(value)
            }

            this.value = value;
            this.state = PROMISE_STATE.REJECTED;
            this.#runCallbacks();
        })
    }

    then(thenCb, catchCb) {
        return new MyPromise((resolve, reject) => {
            this.#thenCallbacks.push(result => {
                if(thenCb == null) {
                    resolve(result);
                    return 
                }

                try {
                    resolve(thenCb(result))
                }
                catch(e) {
                    reject(e)
                }
            });
            
            this.#catchCallbacks.push(result => {
                if(catchCb == null) {
                    reject(result);
                    return 
                }

                try {
                    resolve(catchCb(result))
                }
                catch(e) {
                    reject(e)
                }
            });
            
            this.#runCallbacks();
        });

    }

    catch(cb) {
        return this.then(null, cb);
    }

    finally(cb) {
        return this.then(result => {
            cb()
            return result
        }, result => {
            cb()
            throw result
        })
    }

    static resolve(value) {
        return new MyPromise((resolve) => {
            resolve(value)
        })
    }

    static reject(value) {
        return new MyPromise((resolve, reject) => {
            reject(value)
        })
    }

    static all(promises) {
        const results = []
        let completed = 0;

        return new MyPromise((resolve, reject) => {
            for(let i = 0; i < promises.length; i++) {
                promises[i].then((res) => {
                    completed += 1
                    results[i] = res
                    if(completed == promises.length) {
                        resolve(results)
                    }
                })
                .catch(err => {
                    reject(err);
                })
            }
        })
    }

    static allSettled(promises) {
        const results = [];
        let completed = 0;

        return new MyPromise((resolve) => {
            for(let i = 0; i < promises.length; i ++) {
                promises[i].then((result) => {
                    results[i] = {
                        status: PROMISE_STATE.FULFILLED,
                        value: result
                    };
                })
                .catch(err => {
                    results[i] = {
                        status: PROMISE_STATE.REJECTED,
                        reason: err
                    }
                })
                .finally(() => {
                    completed += 1
                    if(completed === promises.length) {
                        resolve(results)
                    }
                })
            }
        })
    }

    static race(promises) {
        return new MyPromise((resolve, reject) => {
            for(let i = 0; i < promises.length; i++) {
                promises[i].then((result) => {
                    resolve(result)
                })
                .catch((err) => {
                    reject(err)
                })
            }
        })
    }

    static any(promises) {
        let failedPromises = 0;
        const errors = []
        return new MyPromise((resolve, reject) => {
            for(let i = 0; i < promises.length; i++) {
                promises[i].then((result) => {
                    resolve(result)
                })
                .catch((err) => {
                    failedPromises += 1
                    errors[i] = err
                    if(failedPromises === promises.length) {
                        reject(new AggregateError(errors, "All promises were rejected"));
                    }
                })
            }
        })
    }
}

class UnCaughtPromiseError extends Error {
    constructor(error) {
        super(error)
        this.stack = `(in promise) ${error.stack}`
    }
}

module.exports = MyPromise;