class EventEmitter {
    events = {}
    
    subscribe(eventName, callback) {
        this.events[eventName] = this.events[eventName] || new Set()
        this.events[eventName].add(callback)
        return {
            unsubscribe: () => {
                this.events[eventName].delete(callback)
            }
        };
    }

    emit(eventName, args = []) {
        const res = []
        if(this.events.hasOwnProperty(eventName)){
            for(const callback of this.events[eventName]) {
                res.push(callback(...args))
            }
        }
        return res
    }
}

const eventEmitter = new EventEmitter()
const event = eventEmitter.subscribe('hello', () => console.log("Good Morning"))
eventEmitter.emit('hello')
eventEmitter.emit('hello')
event.unsubscribe()
