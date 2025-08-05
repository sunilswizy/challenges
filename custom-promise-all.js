

async function customPromiseAll(promises) {
    return new Promise((resolve, reject) => {
        const response = [];
        let completed = 0; 
        for(let i = 0; i < promises.length; i++) {
            promises[i].then((res) => {
                response[i] = res;
                completed += 1

                if(completed === promises.length) {
                    resolve(response);
                }
            })
            .catch((e) => {
                reject(e)
            })
        }
    })
};

async function getData() {
    try {
        const response = await customPromiseAll([
            Promise.resolve(1),
            Promise.resolve(2),
            Promise.resolve(3)
        ]);
        console.log("Response", response)
    }
    catch(err) {
        console.log("Error at promise all", err)
    }
}

getData()