const connection = require('./connection');

const findAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products');

  return products;
};

const findById = async (productId) => {
  const [[product]] = await connection.execute('SELECT * FROM products WHERE id = ?', [productId]);

  return product;
};

const insert = async (productData) => {
  const { name } = productData;

  const [{ insertId }] = await connection.execute('INSERT INTO products (name) VALUE (?)', [name]);
  
 return insertId;
};

const update = async (productId, productData) => {
  const { name } = productData;

  const query = 'UPDATE products SET name = ? WHERE id = ?';

  return connection.execute(query, [name, productId]);
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