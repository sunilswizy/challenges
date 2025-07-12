export const debounce = function(fn, t) {
   let timeout = null

   return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), t)
   }
};


const log = debounce(console.log, 100)
log("Hello") // cancelled
log("Hello") // cancelled
log("Hello") // Hello
