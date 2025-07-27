function chunk(arr, size) {
    const res = []
    for(let i = 0; i < arr.length; i+=size) {
        res.push(arr.slice(i, i + size))
    }

    return res
};

function chunkArrayV1(arr, size) {
    const res = []
    let subArray = []
    for(let i = 0; i < arr.length; i++) {
        subArray.push(arr[i])
        if(subArray.length == size) {
            res.push(subArray)
            subArray = []
        }
    }

    if(subArray.length) res.push(subArray)
    return res
};
