const { ifError } = require('assert');
const fs = require('fs');

// const first = fs.readFileSync('./data/first.txt', 'utf8'); //leer



// console.log(first);

// const title = '\nEste contenido de acaba de anadir AAA'
// fs.writeFileSync('./data/four.txt', title, {
//     flag : 'a'
// })

// // fs.writeFileSync('./data/four.txt', 'Este es un tercer archivo xd') //escribir
fs.readFile('./data/first.txt', function name(error, data) {

    if(error){
        console.log('Error en la compilacion' + error);
        
    }

    console.log(data.toString('utf8'));
    
    fs.readFile('./data/second.txt', function name(error, data) {

        if(error){
            console.log('Error en la compilacion' + error);
            
        }
    
        console.log(data.toString('utf8'));
        
        fs.writeFile('./data/newFile.txt', 'Archivo creado desde fs', (err, dat) => {
            console.log(err) //sera null
            console.log(dat) //indefinido
        })
    })
})


