

const obj = {
    name: "car",
    color: "red"
}

function print(price) {
    console.log(`I have ${this.name} in ${this.color} color which I bought for ${price}`)
}

Function.prototype.myCall = function(context = {}, ...args) {
    if(typeof this != 'function') throw new Error("Function is not callable");
    context.fn = this;
    context.fn(...args);
    delete context.fn
}

Function.prototype.myApply = function(context = {}, args = []) {
    if(typeof this != 'function') throw new Error("Function is not callable");
    if(!Array.isArray(args)) throw new Error("Invalid args")
    context.fn = this;
    context.fn(...args)
    delete context.fn
}

Function.prototype.myBind = function(context = {}, ...args) {
    if(typeof this != 'function') throw new Error("Function is not callable");
    context.fn = this;
    return function(...newArgs) {
        return context.fn(...args, ...newArgs)
    }
}

print.call(obj, 20000)
print.myCall(obj, 20000)

print.apply(obj, [20000])
print.myApply(obj, [20000])

const printBind = print.bind(obj)
printBind(20000)

const printMyBind = print.myBind(obj)
printMyBind(20000)