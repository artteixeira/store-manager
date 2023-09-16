const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');

const { salesModel } = require('../../../src/models');
const {
  insertSaleFromModel,
  saleIdFromDB,
  saleIdFromModel,
  saleFromIdModel,
  saleFromIdDB,
  allSalesFromDB,
  allSalesFromModel,
} = require('../mocks/sales.mock');

describe('Realizando Testes - SALES MODEL:', function () {
  it('Testando se insere uma nova venda com sucesso', async function () {
    sinon.stub(connection, 'execute')
      .onFirstCall()
      .resolves([saleIdFromDB])
      .onSecondCall()
      .resolves(null);

    const inputData = [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];

    const insertId = await salesModel.insertNewSale();
    const newSale = await salesModel.insertNewSaleProduct(insertId, inputData);

    expect(insertId).to.be.a('number');
    expect(insertId).to.be.equal(saleIdFromModel);
    expect(newSale).to.be.deep.equal(insertSaleFromModel);
  });

  it('Testando se busca uma venda pelo ID com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves(saleFromIdDB);

    const sale = await salesModel.findById(12);

    expect(sale).to.be.a('array');
    expect(sale).to.be.deep.equal(saleFromIdModel);
  });

  it('Testando se busca todas as vendas com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves(allSalesFromDB);

    const allSales = await salesModel.findAll();
    
    expect(allSales).to.be.a('array');
    expect(allSales).to.be.deep.equal(allSalesFromModel);
  });

  afterEach(function () {
    sinon.restore();
  });
});