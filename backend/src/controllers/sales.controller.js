const { salesService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const showAllSales = async (_req, res) => {
  const { status, data } = await salesService.findAll();

  return res.status(mapStatusHTTP(status)).json(data);
};

const filterSale = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.findById(id);

  return res.status(mapStatusHTTP(status)).json(data);
};

const insertNewSale = async (req, res) => {
  const { body } = req;
  const { status, data } = await salesService.insertNewSale(body);

  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  showAllSales,
  filterSale,
  insertNewSale,
};