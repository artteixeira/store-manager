const { addProductSchema } = require('./schemas');
const statusMap = require('../../utils/statusMap');

const validateNewProduct = ({ name }) => {
  const { error } = addProductSchema.validate({ name });
  if (error) return { status: statusMap.invalidValue, message: error.message };
};

module.exports = {
  validateNewProduct,
};