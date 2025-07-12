
const promise1 = () => new Promise((resolve) => setTimeout(resolve, 1000))
const promise2 = () => new Promise((resolve) => setTimeout(resolve, 1000))
const promise3 = () => new Promise((resolve) => setTimeout(resolve, 5000))
const promise4 = () => new Promise((resolve) => setTimeout(resolve, 2000))


function promisePool(functions, n) {
    return new Promise((resolve) => {
        let i = 0;
        let inProcessing = 0;

        function callback() {
            if(i == functions.length && inProcessing == 0) {
                return resolve()
            }

            while(i < functions.length && inProcessing < n) {
                functions[i++]().then(() => {
                    console.log("Processed")
                    inProcessing -= 1;
                    callback()
                })
                inProcessing += 1;
            }
        }

        callback();
    })
}

async function promisePoolV2(functions, n) {
    let i = 0;

    async function callback() {
        if(i == functions.length) return;
        await functions[i++]();
        console.log("Processed")
        await callback();
    }

    const nPromised = Array(n).fill().map(callback)
    await Promise.all(nPromised)
}

promisePoolV2([promise1, promise2, promise3, promise4], 2).then(() => console.log("Done"))

