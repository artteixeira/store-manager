const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = require('chai');

chai.use(sinonChai);
const { productService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { productFromModel, productFromServiceCreated } = require('../mocks/products.mock');

describe('Realizando Testes - PRODUCTS CONTROLLER:', function () {
  it('Recuperando todos os produtos com sucesso', async function () {
    const req = {
      params: sinon.stub(),
      body: sinon.stub(),
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.showAllProducts(req, res);
    expect(res.status).to.have.been.calledWith(200);
  });

  it('Cadastrando um novo produto com sucesso - status 201', async function () {
    sinon.stub(productService, 'insertNewProduct').resolves(productFromServiceCreated);
    const req = {
      body: { name: 'pamonha de carne' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productsController.createNewProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(productFromModel);
  });

  afterEach(function () {
    sinon.restore();
  });
});