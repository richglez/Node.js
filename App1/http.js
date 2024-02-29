const http = require('http');

const server = http.createServer(function (request, response) { //cada vez que se visite algo

    console.log(request.url);
    if(request.url === '/'){
        //Poner algo en la pagina html
        response.write('<h1>Primera app web</h1>')
        return response.end()
    }


    if(request.url === '/about'){
        response.write('<h1>Acerca de</h1>')
        return response.end()
    }

    else{
        response.write(`
        <h1>Not Found</h1>
        <p>Esta Pagina no se encuetra disponible</p>
        <a href= '/'>Volver a la pagina inicial</a>
        `)
        return response.end()
    }
    


})
server.listen(3000) //puerto del servidor
console.log('Servidor escuchando el el puerto 3,000')