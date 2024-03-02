const http = require('http');
const {createReadStream} = require('fs');
const { error } = require('console');

const server = http.createServer((request,response) => {
    const fileStream = createReadStream('./data/bifFile.txt', {
        encoding: 'utf-8'
    })

    //cuando este leyendo el archivo
    fileStream.on('data', (chunk) => {
        //al momento que vas a responder pasale el contenido data
        fileStream.pipe(response)
    })

    //cuando oucrra un error
    fileStream.on('error', error => {
        console.log(error);
        
    })
})

server.listen(3000)
//y cuando empieces
console.log(`Server on port: ${3000}`);
