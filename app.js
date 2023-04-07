// import ProductManager from './ProductManager.js';
const ProductManager = require('./ProductManager')
const express = require('express');
const server = express();
const port = 8080;



const producto = new ProductManager('archivo.json');

// /products?limit=1
server.get('/products', async (req, res) => {
    if (req.query.limit) {
        const limit = req.query.limit;
        if (producto.products.length >= limit) {
            const shortArray = producto.products.slice(0, limit);
            res.send(shortArray);
        } else {
            res.send(producto.products);    
        }
    } else {
        res.send(producto.products);
    }
})

// /products/yba23
server.get('/products/:pid/', async (req, res) => {
    const codeProduct = await producto.getProductByCode(req.params.pid);
    res.send(codeProduct);
});



server.listen(port, () => {
    console.log(`Servidor BE activo en puerto ${port}.`);
});
