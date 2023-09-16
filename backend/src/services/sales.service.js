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

const findById = async (productId) => {
  const sale = await salesModel.findById(productId);
  if (sale.length === 0) { 
    return { status: statusMap.notfound, data: { message: 'Sale not found' } }; 
}
  return { status: statusMap.successful, data: sale };
};

const insertNewSale = async (saleData) => {
  const xd = await validateProductsOnSale(saleData);
  if (!xd) return { status: statusMap.notfound, data: { message: 'Product not found' } };
  const insertId = await salesModel.insertNewSale();
  const newSale = await salesModel.insertNewSaleProduct(insertId, saleData);
  return { status: statusMap.created, data: newSale };
};

module.exports = {
  findAll,
  findById,
  insertNewSale,
};