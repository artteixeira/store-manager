const productIdFromDB = { insertId: 5 };

const productIdFromModel = 5;

const productFromModel = {
  id: 5,
  name: 'pamonha de carne',
};

const productFromServiceCreated = {
  status: 'CREATED',
  data: productFromModel,
};

module.exports = {
  productIdFromDB,
  productIdFromModel,
  productFromModel,
  productFromServiceCreated,
};