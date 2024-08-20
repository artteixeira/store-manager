const { salesModel } = require('../models');

const statusMap = require('../utils/statusMap');

const validateProductsOnSale = async (saleData) => {
  const productId = saleData.map((sale) => sale.productId);

  const promises = productId.map(async (id) => {
    const product = await salesModel.findById(id);
    
    if (product.length === 0) return false;
    return id;
  });

  const errors = await Promise.all(promises);

  const solved = errors.every((value) => value);

  return solved;
};

const findAll = async () => {
  const sales = await salesModel.findAll();

  return { status: statusMap.successful, data: sales };
};

const findById = async (saleId) => {
  const sale = await salesModel.findById(saleId);
  if (sale.length === 0) { 
    return { status: statusMap.notfound, data: { message: 'Sale not found' } }; 
}
  return { status: statusMap.successful, data: sale };
};

const insertNewSale = async (saleData) => {
  const error = await validateProductsOnSale(saleData);
  if (!error) return { status: statusMap.notfound, data: { message: 'Product not found' } };
  const insertId = await salesModel.insertNewSale();
  const newSale = await salesModel.insertNewSaleProduct(insertId, saleData);
  return { status: statusMap.created, data: newSale };
};

const removeSale = async (saleId) => {
  const sale = await salesModel.findById(saleId);
  if (sale.length === 0) {
    return { status: statusMap.notfound, data: { message: 'Sale not found' } };
  }
  
  await salesModel.deleteSale(saleId);
  return { status: statusMap.nocontent };
};

module.exports = {
  findAll,
  findById,
  insertNewSale,
  removeSale,
};