const connection = require('./connection');

const findAll = async () => {
  const [sales] = await connection.execute(`SELECT 
  sp.sale_id saleId, 
  s.date date, 
  sp.product_id productId,
  sp.quantity quantity
  FROM sales s INNER JOIN sales_products sp
  ON s.id = sp.sale_id 
  GROUP BY sp.sale_id, sp.product_id, sp.quantity ORDER BY sp.sale_id, sp.product_id`);

  return sales;
};

const findById = async (saleId) => {
  const [sale] = await connection.execute(`SELECT 
  s.date date, 
  sp.product_id productId, 
  sp.quantity quantity 
  FROM sales s INNER JOIN sales_products sp 
  ON s.id = sp.sale_id WHERE s.id = ? order by sp.sale_id, sp.product_id`, [saleId]);

  return sale;
};

const insertNewSale = async () => {
  const [{ insertId }] = await connection.execute('INSERT INTO sales () VALUES ();');

  return insertId;
};

const insertNewSaleProduct = async (insertId, productSale) => {
  const promises = productSale.map(async (product) => {
        await connection
      .execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)', 
      [insertId, product.productId, product.quantity],
    );
  });

  await Promise.all(promises);

  return {
    id: insertId,
    itemsSold: productSale,
  };
};

const deleteSale = async (insertId) => {
  await connection.execute('DELETE FROM sales WHERE id = ?', [insertId]);
  await connection.execute('DELETE FROM sales_products WHERE sale_id = ?', [insertId]);
};

module.exports = {
  findAll,
  findById,
  insertNewSale,
  insertNewSaleProduct,
  deleteSale,
};