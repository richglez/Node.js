const express = require('express');
const app = express()

app.get('/', (req, res) => {
    res.sendFile('./public/index.html', {
        root: __dirname
    })
})

app.listen(3000)


console.log(`Server on port 3000 ${3000}`);
