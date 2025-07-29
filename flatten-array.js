
function flat(arr, level) {
    if(level == 0) {
        return arr
    }

    const res = []
    for(const ele of arr) {
        if(Array.isArray(ele)) {
            res.push(...flat(ele, level - 1))
        }
        else {
            res.push(ele)
        }
    }

    return res
}

function flatV2(arr, level) {
    const res = []

    function helper(arr, depth) {
        for(const val of arr) {
            if(Array.isArray(val) && depth < level) {
                helper(val, depth + 1)
            }
            else{
                res.push(val)
            }
        }
    }
    helper(arr, 0)
    return res;
}


console.log(flatV2([1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]], 1))
console.log(flatV2([1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]], 2))
console.log(flatV2([1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]], 3))


