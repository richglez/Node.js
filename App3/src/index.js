import Express from "express";
const app = Express()

app.get('/', (request, response) => { //cuando te visiten en tu pagina principal
    response.send('<h1>Bienvenido a richcode</h1>')  //envio de respuesta al frontend
}) 

app.get('/about', (request, response) => { //cuando te visiten en tu pagina principal
    response.send('<h1>Acerca de</h1>')  //envio de respuesta al frontend
})


if(app.listen(3000)){
    console.log(`Servidor iniciado en el puerto: ${3000}`)
}

