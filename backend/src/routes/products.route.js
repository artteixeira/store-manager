const route = require('express').Router();
const { productsController } = require('../controllers');
const { validateProductsFields } = require('../middlewares/validateFields');

route.get('/', productsController.showAllProducts);

route.get('/:id', productsController.filterProduct);

route.post('/', validateProductsFields, productsController.createNewProduct);

route.put('/:id', validateProductsFields, productsController.updateProduct);

module.exports = route;