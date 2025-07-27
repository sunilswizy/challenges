const MyPromise = require('./mypromise');


describe('MyPromise', () => {
    test('should resolve with value', () => {
        const promise = new MyPromise((resolve) => resolve('Success'));
        return promise.then(value => {
            expect(value).toBe('Success');
        });
    });

    test('should reject with reason', () => {
        const promise = new MyPromise((_, reject) => reject('Error'));
        return promise.catch(reason => {
            expect(reason).toBe('Error');
        });
    });

    test('should handle multiple then calls', () => {
        const promise = new MyPromise((resolve) => resolve('Value'));
        return promise
            .then(value => value + ' 1')
            .then(value => {
                expect(value).toBe('Value 1');
            });
    });

    test('should handle chaining with catch', () => {
        const promise = new MyPromise((_, reject) => reject('Error'));
        return promise
            .catch(reason => reason + ' handled')
            .then(value => {
                expect(value).toBe('Error handled');
            });
    });

    test('should execute finally block', () => {
        let finallyCalled = false;
        const promise = new MyPromise((resolve) => resolve('Value'));
        return promise.finally(() => {
            finallyCalled = true;
        }).then(() => {
            expect(finallyCalled).toBe(true);
        });
    });

    test('MyPromise.resolve should resolve with value', () => {
        return MyPromise.resolve('Resolved').then(value => {
            expect(value).toBe('Resolved');
        });
    });

    test('MyPromise.reject should reject with reason', () => {
        return MyPromise.reject('Rejected').catch(reason => {
            expect(reason).toBe('Rejected');
        });
    });

    test('MyPromise.all should resolve when all promises resolve', () => {
        const p1 = MyPromise.resolve(1);
        const p2 = MyPromise.resolve(2);
        const p3 = MyPromise.resolve(3);
        return MyPromise.all([p1, p2, p3]).then(values => {
            expect(values).toEqual([1, 2, 3]);
        });
    });

    test('MyPromise.all should reject if any promise rejects', () => {
        const p1 = MyPromise.resolve(1);
        const p2 = MyPromise.reject('fail');
        return MyPromise.all([p1, p2]).catch(reason => {
            expect(reason).toBe('fail');
        });
    });

    test('MyPromise.allSettled should resolve with statuses', () => {
        const p1 = MyPromise.resolve('ok');
        const p2 = MyPromise.reject('bad');
        return MyPromise.allSettled([p1, p2]).then(results => {
            expect(results).toEqual([
                { status: 'fulfilled', value: 'ok' },
                { status: 'rejected', reason: 'bad' }
            ]);
        });
    });

    test('MyPromise.race should resolve/reject with first settled promise', () => {
        const p1 = new MyPromise(resolve => setTimeout(() => resolve('slow'), 20));
        const p2 = new MyPromise(resolve => setTimeout(() => resolve('fast'), 10));
        return MyPromise.race([p1, p2]).then(value => {
            expect(value).toBe('fast');
        });
    });

    test('MyPromise.any should resolve with first fulfilled promise', () => {
        const p1 = MyPromise.reject('fail1');
        const p2 = MyPromise.resolve('win');
        const p3 = MyPromise.reject('fail2');
        return MyPromise.any([p1, p2, p3]).then(value => {
            expect(value).toBe('win');
        });
    });

    test('MyPromise.any should reject with AggregateError if all reject', () => {
        const p1 = MyPromise.reject('fail1');
        const p2 = MyPromise.reject('fail2');
        return MyPromise.any([p1, p2]).catch(error => {
            expect(error instanceof AggregateError).toBe(true);
            expect(error.errors).toEqual(['fail1', 'fail2']);
        });
    });
});