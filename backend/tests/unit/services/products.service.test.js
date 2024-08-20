const { expect } = require('chai');
const sinon = require('sinon');

const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');

const { allProductsFromModel, productFromModel, productIdFromModel } = require('../mocks/products.mock');

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
    expect(responseService.data).to.deep.equal({
      message: '"name" length must be at least 5 characters long',
    });
  });

  it('Insere um produto no banco de dados com sucesso', async function () {
    sinon.stub(productsModel, 'insert').resolves(productIdFromModel);

    const inputData = { name: 'Rogério' };
    
    const responseService = await productsService.insertNewProduct(inputData);

    expect(responseService.status).to.equal('CREATED');
  });

  it('Retorna um erro caso o nome enviado para atualização do cadastro seja menor que 5 caracteres', async function () {
    const inputData = { name: 'Cach' };
    const inputId = 2;

    const responseService = await productsService.updateProduct(inputId, inputData);

    expect(responseService.status).to.equal('INVALID_VALUE');
  });

  it('Retorna um erro caso o id do produto não seja encontrado', async function () {
    sinon.stub(productsModel, 'findById').resolves(undefined);

    const inputId = 2;
    const inputData = { name: 'Cachorrinho ' };

    const responseService = await productsService.updateProduct(inputId, inputData);

    expect(responseService.status).to.equal('NOT_FOUND');
  });

  it('Atualiza o produto com sucesso', async function () {
    const inputData = { name: 'Batata Assada' };
    const inputId = 5;

    sinon.stub(productsModel, 'findById')
    .onFirstCall()
    .resolves(productFromModel)
    .onSecondCall()
    .resolves({
      id: inputId,
      name: inputData.name,
    });

    const responseService = await productsService.updateProduct(inputId, inputData);

    expect(responseService.status).to.equal('SUCCESSFUL');
  });

  it('Retorna um erro se tentar remover um produto que não existe', async function () {
    sinon.stub(productsModel, 'findById').resolves(undefined);

    const inputId = 2;

    const responseService = await productsService.removeProduct(inputId);

    expect(responseService.status).to.equal('NOT_FOUND');
  });

  it('Remove um produto do banco de dados com sucesso', async function () {
    sinon.stub(productsModel, 'findById').resolves({ Test: 'testando ' });

    const inputId = 2;

    const responseService = await productsService.removeProduct(inputId);

    expect(responseService.status).to.equal('NO_CONTENT');
  });
  
  afterEach(function () {
    sinon.restore();
  });
});