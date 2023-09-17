const { productsModel } = require('../models');
const statusMap = require('../utils/statusMap');
const {
validateNewProduct,
} = require('./validations/validationsInputValues');

const findAll = async () => {
  const products = await productsModel.findAll();

  return { status: statusMap.successful, data: products };
};

const findById = async (productId) => {
  const product = await productsModel.findById(productId);

  if (!product) return { status: statusMap.notfound, data: { message: 'Product not found' } };
  return { status: statusMap.successful, data: product };
};

const insertNewProduct = async (productData) => {
  const { name } = productData;
  const error = validateNewProduct(name);
  if (error) return { status: error.status, data: { message: error.message } };

  const insertId = await productsModel.insert(productData);
  const newProduct = await productsModel.findById(insertId);

  return { status: statusMap.created, data: newProduct };
};

const updateProduct = async (id, data) => {
  const { name } = data;
  const error = validateNewProduct(name);
  if (error) return { status: error.status, data: { message: error.message } }; 

  const product = await productsModel.findById(id);
  if (!product) return { status: statusMap.notfound, data: { message: 'Product not found' } };
  await productsModel.update(id, data);
  const updatedProduct = await productsModel.findById(id);

  return { status: statusMap.successful, data: updatedProduct };
};

const removeProduct = async (id) => {
  const product = await productsModel.findById(id);
  if (!product) return { status: statusMap.notfound, data: { message: 'Product not found' } };

  await productsModel.remove(id);
  return { status: statusMap.nocontent };
};

module.exports = {
  findAll,
  findById,
  insertNewProduct,
  updateProduct,
  removeProduct,
};