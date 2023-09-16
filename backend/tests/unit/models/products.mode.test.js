const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');

const { productsModel } = require('../../../src/models');
const { productIdFromDB, productIdFromModel } = require('../mocks/products.mock');

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

  afterEach(function () {
    sinon.restore();
  });
});