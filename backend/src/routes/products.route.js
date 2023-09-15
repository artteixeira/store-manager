const route = require('express').Router();
const { productsController } = require('../controllers');

route.get('/', productsController.showAllProducts);

route.get('/:id', productsController.filterProduct);

route.post('/', productsController.createNewProduct);

module.exports = route;