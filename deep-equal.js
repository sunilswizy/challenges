
const obj1 = {
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

const obj2 = {
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

console.log(JSON.stringify(obj1) === JSON.stringify(obj2))
console.log(isEqual(obj1, obj2))


function isEqual(obj1, obj2) {
    const keys1 = Object.keys(obj1)
    const keys2 = Object.keys(obj2)
    
    if(keys1.length !== keys2.length) return false
    
    for(let key of keys1) {
        if(!(key in obj2)) return false
        if(!compareValues(obj1[key], obj2[key])) return false
    }
    
    return true
}

function compareValues(value1, value2) {
    if(value1 === null || value2 === null) return value1 === value2

    if(Array.isArray(value1) && Array.isArray(value2)) {
        if(!isEqualArray(value1, value2)) return false
    }
    else if(typeof value1 === 'object' && typeof value2 === 'object') {
        if(!isEqual(value1, value2)) return false 
    }
    else if(value1 != value2) {
        return false
    }
    return true
}

function isEqualArray(arr1, arr2) {
    if(arr1.length !== arr2.length) return false
    
    for(let i = 0; i < arr1.length; i++) {
        if(!compareValues(arr1[i], arr2[i])) return false
    }
    
    return true
}



