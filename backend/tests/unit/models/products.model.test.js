const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');

const { productsModel } = require('../../../src/models');
const { 
  productIdFromDB, 
  productIdFromModel, 
  productFromModel, 
  productFromDB,
  allProductsFromModel,
  allProductsFromDB,
 } = require('../mocks/products.mock');

describe('Realiando Testes - PRODUCT MODEL:', function () {
  it('Testando se insere um novo produto com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([productIdFromDB]);

    const inputData = {
      name: 'Boladinho',
    };

    const insertId = await productsModel.insert(inputData);

    expect(insertId).to.be.a('number');
    expect(insertId).to.equal(productIdFromModel);
  });

  it('Testando se filtra um produto pelo ID com sucess', async function () {
    sinon.stub(connection, 'execute').resolves([productFromDB]);

    const inputData = 5;

    const modelResponse = await productsModel.findById(inputData);

    expect(modelResponse).to.be.a('object');
    expect(modelResponse).to.be.deep.equal(productFromModel);
  });

  it('Testando se lista todos os produtos registrados com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves(allProductsFromDB);

    const modelResponse = await productsModel.findAll();

    expect(modelResponse).to.be.a('array');
    expect(modelResponse).to.be.deep.equal(allProductsFromModel);
  });

  afterEach(function () {
    sinon.restore();
  });
});