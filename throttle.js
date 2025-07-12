const throttle = (fn, delay) => {
  let isExecuting = false;
  let nextArgs = null;

  return (...args) => {
    if (isExecuting) {
        nextArgs = args
        return;
    };

    isExecuting = true;
    fn(...args);
    setTimeout(helper, delay);

    function helper() {
        if(nextArgs) {
            fn(...nextArgs)
            isExecuting = true;
            nextArgs = null;
            setTimeout(helper, delay)
        }
        else {
            isExecuting = false;
        }
    }
  };
};

const log = throttle(console.log, 0);
log("Hello");
log("Hello");
log("Hello");
log("Hello");
log("Hello");
log("Hello");
log("Hello");
log("Hello");
log("Hello");
log("Hello");
log("Hello");
log("Hello");
log("Hello");
log("Hello");
log("Hello final");

setTimeout(() => {
  log("Hello");
  log("Hello");
  log("Hello");
  log("Hello");
  log("Hello");
  log("Hello");
  log("Hello");
  log("Hello");
  log("Hello");
  log("Hello");
  log("Hello");
  log("Hello");
  log("Hello");
  log("Hello");
  log("Hello");
  log("Hello");
  log("Hello");
  log("Hello");
  log("Hello");
  log("Hello");
  log("Hello");
  log("Hello");
  log("Hello");
  log("Hello");
}, 1000);
