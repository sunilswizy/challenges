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


function deepClone(obj) {
    if(Array.isArray(obj)) {
       return cloneArray(obj)
    }

    if(obj == null || typeof obj != 'object') {
        return obj
    }

    const new_obj = {}

    for(const key in obj) {
        const value = obj[key];

        if(Array.isArray(value)) {
            new_obj[key] = cloneArray(value);
        }
        else if(typeof value == 'object') {
            new_obj[key] = deepClone(value)
        }
        else {
            new_obj[key] = value;
        }
    }


    return new_obj;
}

function cloneArray(value) {
    const newArr = [];
    for(const ele of value) {
        newArr.push(deepClone(ele));
    }
    return newArr;
}

const result = deepClone(obj1);
obj1.name = 'swizy'
obj1.apps[0] = 'a'

console.log(result)
console.log(obj1)