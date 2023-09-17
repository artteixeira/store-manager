const connection = require('./connection');

const {
  getFormattedColumnNames,
  getFormattedPlaceholders,
  getFormattedUpdateColumns,
} = require('../utils/generateFormattedQuery');

const findAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products');

  return products;
};

const findById = async (productId) => {
  const [[product]] = await connection.execute('SELECT * FROM products WHERE id = ?', [productId]);

  return product;
};

const insert = async (productData) => {
  const columns = getFormattedColumnNames(productData);
  const placeholders = getFormattedPlaceholders(productData);
  const query = `INSERT INTO products (${columns}) VALUE (${placeholders});`;

  const [{ insertId }] = await connection.execute(query, [...Object.values(productData)]);
  
 return insertId;
};

const update = async (productId, productData) => {
  const updatedData = getFormattedUpdateColumns(productData);

  const query = `UPDATE products SET ${updatedData} WHERE id = ?`;

  return connection.execute(query, [...Object.values(productData), productId]);
};

const remove = async (productId) => 
  connection.execute('DELETE FROM products WHERE id = ?', [productId]);

module.exports = {
  findAll,
  findById,
  insert,
  update,
  remove,
};