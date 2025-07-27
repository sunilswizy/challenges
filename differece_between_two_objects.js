// const obj1 = {
//     "a": 5,
//     "v": 6,
//     "z": [1, 2, 4, [2, 5, 7]],
//     "x": {
//         "a": null
//     }
// }

// const obj2 = {
//     "a": 5,
//     "v": 5,
//     "z": [1, 2, 3, [1]],
//     "x": [null, 2]
// }

const obj1 = {"a": 5, "b": 22, "x": { "a": null }, "z": [10, 30]}
const obj2 = {"a": 10, "b": 22, "x": { "a": 10 }, "z": [10, 20]}


function objectDifference(obj1, obj2) {
    if(!isObject(obj1) && !isObject(obj2)) return obj1 === obj2 ? {} : [obj1, obj2];
    if(!isObject(obj1) || !isObject(obj2)) return [obj1, obj2]
    if(Array.isArray(obj1) !== Array.isArray(obj2)) return [obj1, obj2]

    const diff = {}
    
    for(const key in obj1) {
        if(!obj2.hasOwnProperty(key)) continue
        const res = objectDifference(obj1[key], obj2[key])
        if(Object.keys(res).length) {
            diff[key] = res
        }
    }

    return diff

    function isObject(obj) {
        return obj !== null && typeof obj == 'object'
    }
}


console.log(objectDifference(obj1, obj2))