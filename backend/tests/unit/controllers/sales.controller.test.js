const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = require('chai');

chai.use(sinonChai);

const { salesController } = require('../../../src/controllers');

describe('Realizando Testes - SALES CONTROLLER:', function () {
  it('Recuperando todas as vendas com sucesso', async function () {
    const req = {
      params: sinon.stub(),
      body: sinon.stub(),
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.showAllSales(req, res);
    expect(res.status).to.have.been.calledWith(200);
  });
});