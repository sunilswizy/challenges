

function memorize(fn) {
    const cache = {}
    return (...args) => {
        const keys = JSON.stringify(args);

        if(keys in cache){
            console.log("Cached")
            return cache[keys]
        }

        console.log("Calculating")
        cache[keys] = fn(...args)
        return cache[keys]
    }
}


function add(a, b) {
    return a + b
}


const memorizedAdd = memorize(add);

console.log(memorizedAdd(10, 20))
console.log(memorizedAdd(100, 20))
console.log(memorizedAdd(10, 20))
console.log(memorizedAdd(10, 20))
console.log(memorizedAdd(100, 20))



