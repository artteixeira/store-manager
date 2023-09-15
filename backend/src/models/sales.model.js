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

module.exports = {
  findAll,
  findById,
};