const route = require('express').Router();
const { salesController } = require('../controllers');
const { validateSalesFields } = require('../middlewares/validateFields');

route.get('/', salesController.showAllSales);

route.get('/:id', salesController.filterSale);

route.post('/', validateSalesFields, salesController.insertNewSale);

module.exports = route;