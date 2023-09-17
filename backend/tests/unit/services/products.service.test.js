const { expect } = require('chai');
const sinon = require('sinon');

const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');

const { allProductsFromModel, productFromModel } = require('../mocks/products.mock');

describe('Realizando Testes - PRODUCTS SERVICE:', function () {
  it('Lista todos os produtos com sucesso', async function () {
    sinon.stub(productsModel, 'findAll').resolves(allProductsFromModel);

    const responseService = await productsService.findAll();

    expect(responseService.status).to.equal('SUCCESSFUL');
  });

  it('Lista o produto filtrado pelo ID com sucesso', async function () {
    sinon.stub(productsModel, 'findById').resolves(productFromModel);

    const inputData = 7;

    const responseService = await productsService.findById(inputData);

    expect(responseService.status).to.equal('SUCCESSFUL');
    expect(responseService.data).to.deep.equal(productFromModel);
  });

  it('Retorna "Not Found" se não encontrar um produto com o ID enviado', async function () {
    sinon.stub(productsModel, 'findById').resolves(undefined);

    const inputData = 99;

    const responseService = await productsService.findById(inputData);

    expect(responseService.status).to.equal('NOT_FOUND');
    expect(responseService.data).to.deep.equal({ message: 'Product not found' });
  });

  it('Retorna um erro caso o nome enviado para cadastro seja menor que 5 caracteres', async function () {
    const inputData = { name: 'Rog' };

    const responseService = await productsService.insertNewProduct(inputData);

    expect(responseService.status).to.equal('INVALID_VALUE');
  });
  
  afterEach(function () {
    sinon.restore();
  });
});