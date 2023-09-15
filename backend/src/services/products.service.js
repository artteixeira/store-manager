const { productModel } = require('../models');
const statusMap = require('../utils/statusMap');
const {
validateNewProduct,
} = require('./validations/validationsInputValues');

const findAll = async () => {
  const products = await productModel.findAll();

  return { status: statusMap.successful, data: products };
};

const findById = async (productId) => {
  const product = await productModel.findById(productId);
  if (!product) return { status: statusMap.notfound, data: { message: 'Product not found' } };
  return { status: statusMap.successful, data: product };
};

const insertNewProduct = async (name) => {
  const error = validateNewProduct(name);
  if (error) return { status: error.status, data: { message: error.message } };

  const insertId = await productModel.insert(name);
  const newProduct = await productModel.findById(insertId);
  return { status: statusMap.created, data: newProduct };
};

module.exports = {
  findAll,
  findById,
  insertNewProduct,
};