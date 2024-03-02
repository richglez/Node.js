const EventEmitter = require('events');
const newEvent = new EventEmitter();
const res = 'response'

newEvent.on(res, (data) => {
    // console.log('Rescibido');
    
    console.log(data);
    
})

newEvent.emit(res, 'Rich escribio aqui')
newEvent.emit(res, 'Rich NO ESTA aqui')
newEvent.emit(res, 'Rich SI ESTA aqui')
newEvent.emit(res, 'Rich SE FUE DE aqui')