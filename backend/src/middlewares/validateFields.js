const checkRequiredFields = require('../utils/checkRequiredFields');

const validateProductsFields = (req, res, next) => {
  const { body } = req;
  const { name } = body;
  const requiredProductsFields = ['name'];

  const productsError = checkRequiredFields(body, requiredProductsFields);

  if (productsError) return res.status(400).json({ message: productsError });
  if (name && name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  next();
};

const checkRequiredSalesFields = (salesData) => {
  const requiredSalesFields = ['productId', 'quantity'];
  
  const salesError = salesData.map((product) => {
    const error = checkRequiredFields(product, requiredSalesFields);
    
    if (error) return error;
    return undefined;
  });

  const errorFilter = salesError.filter((e) => e !== undefined);

  return errorFilter;
};

const checkQuantitysSalesFields = (salesData) => {
  const quantitys = salesData.map((product) => Number(product.quantity));

  const filteredQuantitys = quantitys.filter((quantity) => quantity <= 0);

  if (filteredQuantitys.length !== 0) return true;
};

const validateSalesFields = (req, res, next) => {
  const { body } = req;
  const requiredFields = checkRequiredSalesFields(body);
  const quantitys = checkQuantitysSalesFields(body);

  if (requiredFields.length !== 0) return res.status(400).json({ message: requiredFields[0] });
  if (quantitys) {
    return res.status(422)
    .json({ message: '"quantity" must be greater than or equal to 1' }); 
}

  next();
};

module.exports = {
  validateProductsFields,
  validateSalesFields,
};