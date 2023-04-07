const ProductManager = require('./ProductManager')
const express = require('express');
const server = express();
const port = 8080;



const producto = new ProductManager('../archivo.json');

// const add = async () => {
//     await producto.addProduct({title: 'manzana', description:'deliciosa', price:5, thumbnail:'manzana.png', code: "man1", stock:600 });
//     await producto.addProduct({title: 'modem', description:'technicolor', price:500, thumbnail:'modem.png', code: "mod1", stock:40 });
//     await producto.addProduct({title: 'botella', description:'negra', price:25, thumbnail:'botella.png', code: "bot1", stock:10 });
//     await producto.addProduct({title: 'decodificador', description:'Flow', price:2500, thumbnail:'decoflow.png', code: "flw1", stock:6 });
//     await producto.addProduct({title: 'iPad', description:'Air 10"', price:10000, thumbnail:'ipad.png', code: "ipd1", stock:1 });
// }

// add();

// /products?limit=1
server.get('/products', async (req, res) => {
    producto.load();
    if (req.query.limit) {
        const limit = req.query.limit;
        const shortArray = producto.products.slice(0, limit);
        res.send(shortArray);

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
