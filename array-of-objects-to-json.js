
const arr = [
    { "b": 1, "a": 2 },
    { "b": 2, "a": 1 },
];

console.log(jsonToMatrix(arr));


function jsonToMatrix(arr) {
    
    const keySet = new Set()

    for(const obj of arr) {
        getKeys(obj, "")
    }

    const sortedKeys = Array.from(keySet).sort();
    const res = [];
    res.push(sortedKeys)

    for(const obj of arr) {
        const keyToVal = {};
        getValues(obj, "", keyToVal);
        const row = [];

        for(const key of sortedKeys) {
            row.push(key in keyToVal ? keyToVal[key] : "")
        }
        res.push(row);
    }

    return res


    function getKeys(obj, path) {
        for(const key in obj) {
            const newPath = path ? `${path}.${key}`: key;
            if(isObject(obj[key])) {
                getKeys(obj[key], newPath)
            }
            else {
                keySet.add(key);
            }
        }
    }

    function isObject(obj) {
        return obj !== null && typeof obj === 'object'
    }

    function getValues(obj, path, keyToVal) {
        for(const key in obj) {
            const newPath = path ? `${path}.${key}`: key;
            if(isObject(obj[key])) {
                getValues(obj[key], newPath, keyToVal)
            }
            else {
                keyToVal[newPath] = obj[key]
            }
        }
    }
    
}