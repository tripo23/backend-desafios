const fs = require('fs');

class ProductManager {
    static ultimoId = 1;

    constructor(path) {
        this.path = path;
        this.products = [];
    }

    addProduct = async (objProduct) => {
        try {
            await this.load();
            if (this.products.find((item) => item.code === objProduct.code)) {
                console.log('Producto existente, por favor intente nuevamente.');
            } else {
                const newProduct = {
                    id: ProductManager.ultimoId++,
                    title: objProduct.title,
                    description: objProduct.description,
                    price: objProduct.price,
                    thumbnail: objProduct.thumbnail,
                    code: objProduct.code,
                    stock: objProduct.stock
                    };
    
                this.products.push(newProduct);
                await this.save();
                console.log('Producto agregado.');
            }       
        } catch(err) {
            console.log(err);
        }
    }

    getProducts = async () => {
        try {
            await this.load();
            if (this.products.length == 0) {
                console.log('No hay productos.');
            } else {
                console.log(this.products);
            }
        } catch (err) {
            console.log(err);
        }
    }

    getProductById = async (id) => {
        try {
            await this.load();
            const found = this.products.find(product => product.id === id);
            return found ? found : console.log('Not found');
        } catch (err) {
            console.log(err);
        }
    }

    getProductByCode = async (code) => {
        try {
            await this.load();
            const found = this.products.find(product => product.code === code);
            return found ? found : console.log('Not found');
        } catch (err) {
            console.log(err);
        }
    }

    updateProduct = async (id, property, value) => {      
        try {
            await this.load();
            const productToUpdate = await this.getProductById(id);
            productToUpdate[property] = value;
            await this.save();
            console.log('Producto actualizado.');
        } catch (error) {
            console.log(error);
        }
    }

    deleteProduct = async (id) => {
        try {
            await this.load();
            this.products = this.products.filter((product) => product.id !== id);
            console.log(this.products);
            console.log('Producto eliminado.');
            await this.save();
        } catch (err) {
            console.log(err);
        }
    }

    async load() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            this.products = JSON.parse(data);
        } catch (error) {
            this.products=[];
        }
    }

    async save() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products));
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ProductManager