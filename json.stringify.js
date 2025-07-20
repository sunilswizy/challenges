
const obj = {
    name: 'sunil',
    age: 23,
    apps: ['notion', 'tmux'],
    metadata: {
        types: ['app'],
        ttl: 21,
        name: {
            age: 10,
            price: 20,
            arr: [1, 2, 3, { key: 'test' }]
        },
        age: null
    }
}


function jsonStringify(obj) {
    if(obj === null || obj === undefined) {
        return String(obj);
    }

    if(Array.isArray(obj)) {
        const values = obj.map((el) => jsonStringify(el));
        return `[${values.join(",")}]`
    }
    
    if(typeof obj === 'object') {
        const keys = Object.keys(obj);
        const keyPairs = keys.map((key) => `"${key}":${jsonStringify(obj[key])}`)
        return `{${keyPairs.join(",")}}` 
    }

    if(typeof obj == 'string') {
        return `"${obj}"`
    }

    return String(obj)
}

const stringify = jsonStringify(obj)
console.log(stringify);
console.log("Parsed", JSON.parse(stringify))