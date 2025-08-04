
function add(num) {
    let total = num;

    function curried(next) {
        total += next
        return curried
    }

    curried.value = function() {
        return total
    }

    return curried
}


console.log(add(1)(2).value()) 
console.log(add(5)(5)(10)(14).value())