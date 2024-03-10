const express = require('express');
const morgan = require('morgan');
const app = express()
let products = [
    {
        id: 1,
        name: "soda",
        price: 100
    },

    {
        id: 2,
        name: "laptop",
        price: 20000
    }
]

//Settings
app.set('appName', 'Aplicacion 5')


//Midlewares
app.use(morgan('dev'))  
app.use(express.json())



//Rutas
app.get('/products', (req, res) => {
    // res.send('Obteniendo productos')
    res.json(products)
})


app.post('/products', (req, res) => {
    const newProducts = {...req.body, id: products.length + 1}
    products.push(newProducts)
    res.send({newProducts})
})


app.put('/products/:id', (req, res) => {

    const newData = req.body 


    //Encotrar producto
    const productFound = products.find((product) => {
        return product.id === parseInt(req.params.id);
    });

    //Si esta undefined
    if (!productFound) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    products = products.map(p => p.id === parseInt(req.params.id) ? {...p, ...newData} : p) //conserva p si no hay coincidencias? 
    res.json({
        message: "Product Updated succesfully"
    })
})


app.delete('/products/:id', (req, res) => {
    const productFound = products.find((product) => {
        return product.id === parseInt(req.params.id);
    });

    //Si esta undefined
    if (!productFound) {
        return res.status(404).json({
            message: "Product not found"
        });
    }


    products = products.filter(p => p.id !== parseInt(req.params.id)); //Elimina el producto
    res.sendStatus(204) //Mandar el estatus que ya no se encuentra el id que borro
})

app.get('/products/:id', (req, res) => {
    const productFound = products.find((product) => {
        return product.id === parseInt(req.params.id);
    });

    //Si esta undefined
    if (!productFound) {
        return res.status(404).json({
            message: "Product not found"
        });
    }


    console.log(productFound);
    res.json(productFound);
});


app.listen(3000)
console.log(`Server ${app.get('appName')} on port: ${3000}`)