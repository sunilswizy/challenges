

setTimeout(() => {
    console.log("hello")
}, 1000)

customSetTimeout(() => {
    console.log("hello")
}, 1000)

customSetTimeoutV2(() => {
    console.log("hello")
}, 3000)

function customSetTimeout(fn, delay) {
    const id = setInterval(() => {
        fn()
        clearInterval(id);
    }, delay)
}

function customSetTimeoutV2(fn, delay) {
    let time = 0
    let interval = 1;

    const id = setInterval(() => {
        time += interval;
        if(time >= delay) {
            fn()
            clearInterval(id);
        }
    }, interval);
}

