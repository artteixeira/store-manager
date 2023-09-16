const { productsService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const showAllProducts = async (_req, res) => {
  const { status, data } = await productsService.findAll();

  return res.status(mapStatusHTTP(status)).json(data);
};

const filterProduct = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.findById(id);

  return res.status(mapStatusHTTP(status)).json(data);
};

const createNewProduct = async (req, res) => {
  const { body } = req;
  const { status, data } = await productsService.insertNewProduct(body);
  return res.status(mapStatusHTTP(status)).json(data);
};

const updateProduct = async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  const { status, data } = await productsService.updateProduct(id, body);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  showAllProducts,
  filterProduct,
  createNewProduct,
  updateProduct,
};