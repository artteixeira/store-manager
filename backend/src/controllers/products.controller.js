const { productService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const showAllProducts = async (_req, res) => {
  const { status, data } = await productService.findAll();

  return res.status(mapStatusHTTP(status)).json(data);
};

const filterProduct = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productService.findById(id);

  return res.status(mapStatusHTTP(status)).json(data);
};

const createNewProduct = async (req, res) => {
  const { name } = req.body;
  const { status, data } = await productService.insertNewProduct(name);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  showAllProducts,
  filterProduct,
  createNewProduct,
};