
const fib = function* () {
    let n1 = 0, n2 = 1;

    while(true) {
        yield n1;
        [n1, n2] = [n2, n1 + n2]
    }
}


const fibGen = fib()
console.log(fibGen.next())
console.log(fibGen.next())



const inOrderTraversal = function*(arr) {
    if(Array.isArray(arr)) {
        for(let val of arr) {
            yield* inOrderTraversal(val)
        }
    }
    else {
        yield arr
    }
};


const gen = inOrderTraversal([1, [2, 3]]);
gen.next().value; // 1
gen.next().value; // 2
gen.next().value; // 3