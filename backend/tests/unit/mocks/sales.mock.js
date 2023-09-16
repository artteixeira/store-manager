const saleIdFromDB = { insertId: 7 };

const saleIdFromModel = 7;

const eslintDuplicateError = '2023-09-16T19:55:18.000Z';

const insertSaleFromModel = {
  id: 7,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};

const saleFromIdDB = [[
  {
    date: eslintDuplicateError,
    productId: 20,
    quantity: 10,
  },
]];

const saleFromIdModel = [
  {
    date: eslintDuplicateError,
    productId: 20,
    quantity: 10,
  },
];

const allSalesFromModel = [
  {
    saleId: 5,
    date: eslintDuplicateError,
    productId: 3,
    quantity: 4,
  },
  {
    saleId: 7,
    date: eslintDuplicateError,
    productId: 1,
    quantity: 11,
  },
  {
    saleId: 12,
    date: eslintDuplicateError,
    productId: 20,
    quantity: 10,
  },
];

const allSalesFromDB = [[
  {
    saleId: 5,
    date: eslintDuplicateError,
    productId: 3,
    quantity: 4,
  },
  {
    saleId: 7,
    date: eslintDuplicateError,
    productId: 1,
    quantity: 11,
  },
  {
    saleId: 12,
    date: eslintDuplicateError,
    productId: 20,
    quantity: 10,
  },
]];

module.exports = {
  saleIdFromDB,
  saleIdFromModel,
  insertSaleFromModel,
  saleFromIdModel,
  saleFromIdDB,
  allSalesFromDB,
  allSalesFromModel,
};