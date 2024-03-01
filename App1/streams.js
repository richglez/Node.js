// const {writeFile} = require('fs/promises');

// async function createBifFile() {
//     await writeFile('./data/bifFile.txt', 'Hello World'.repeat(10000))
// }



// createBifFile()





const {createReadStream} = require('fs');

const stream = createReadStream('./daata/bifFile.txt', {
    encoding: 'utf-8'
    
});

stream.on('data', (chunk) => {
    console.log(chunk)
})

stream.on('close', () => {
    console.log('Aqui termina el stream :)')
})


stream.on('error', (error) => {
    console.error('Ha ocurrido un error en el stream:', error.message);
})