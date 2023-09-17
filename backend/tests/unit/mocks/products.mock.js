const productIdFromDB = { insertId: 5 };

const productIdFromModel = 5;

const productFromModel = {
  id: 5,
  name: 'pamonha de carne',
};

const productFromDB = [{
  id: 5,
  name: 'pamonha de carne',
}];

const allProductsFromModel = [
  {
    id: 2,
    name: 'de Thor',
  },
  {
    id: 4,
    name: 'encolhimento',
  },
  {
    id: 5,
    name: 'Capitão América',
  },
];

const allProductsFromDB = [[
  {
    id: 2,
    name: 'de Thor',
  },
  {
    id: 4,
    name: 'encolhimento',
  },
  {
    id: 5,
    name: 'Capitão América',
  },
]];

const productFromServiceCreated = {
  status: 'CREATED',
  data: productFromModel,
};

const productFromServiceSuccessful = {
  status: 'SUCCESSFUL',
  data: productFromModel,
};

module.exports = {
  productIdFromDB,
  productIdFromModel,
  productFromModel,
  productFromDB,
  allProductsFromDB,
  allProductsFromModel,
  productFromServiceCreated,
  productFromServiceSuccessful,
};