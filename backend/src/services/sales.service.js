const { salesModel } = require('../models');

const statusMap = require('../utils/statusMap');

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

module.exports = {
  findAll,
  findById,
};