const group = require("../Module/myModule")

function sumar(x, y) {
    return x + y
}

function restar(x, y) {
    return x - y
}


function multi(x, y) {
    return x * y
}

function divide(x, y) {
    return x / y
}

const funOperacionaes = {
    sumar : sumar,
    restar : restar,
    multi : multi,
    divide : divide

}


export default funOperacionaes
