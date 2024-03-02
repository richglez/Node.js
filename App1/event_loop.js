
const http = require('http');

const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.write('Welcome to richcode')
        return res.end()
    }

    if(req.url === '/about'){

        //blocking code
        for (let i = 0; i < 1000; i++) {
            console.log(Math.random()*i)
            
        }
        res.write('About')
        return res.end()
    }

    else{
        return res.end('Not found')
    }
})

server.listen(3000)
console.log('Server on port 3000');
