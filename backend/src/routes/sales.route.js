const route = require('express').Router();
const { salesController } = require('../controllers');

route.get('/', salesController.showAllSales);

route.get('/:id', salesController.filterSale);

module.exports = route;