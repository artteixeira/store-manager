const { expect } = require('chai');
const sinon = require('sinon');

const { validateProductsFields, validateSalesFields } = require('../../../src/middlewares/validateFields');

describe('Realizando Testes - VALIDATEFIELDS MIDDLEWARE:', function () {
  describe('Testando validateProductsFields', function () {
    it('Passa na validação se o formato estiver correto', function () {
      const req = { body: { name: 'Socorro da Silva' } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      const next = sinon.stub().returns();

      validateProductsFields(req, res, next);

      expect(next).to.have.been.calledWith();
    });

    it('Não passa na validação com o campo "nome" faltando - status 400', function () {
      const req = { body: { } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      const next = sinon.stub().returns();

      validateProductsFields(req, res, next);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    });

    it('Não passa na validação com o campo "nome" menor que 5 caracteres - status 422', function () {
      const req = { body: { name: 'acc' } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      const next = sinon.stub().returns();

      validateProductsFields(req, res, next);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    });
  });

  describe('Testando validateSalesFields', function () {
    it('Passa na validação se o formato estiver correto', function () {
      const req = { body: [{ productId: 1, quantity: 5 }] };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      const next = sinon.stub().returns();

      validateSalesFields(req, res, next);

      expect(next).to.have.been.calledWith();
    });

    it('Não passa na validação com o campo "productId" faltando - status 400', function () {
      const req = { body: [{ quantity: 5 }] };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      const next = sinon.stub().returns();

      validateSalesFields(req, res, next);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
    });

    it('Não passa na validação com o campo "quantity" faltando - status 400', function () {
      const req = { body: [{ productId: 1 }] };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      const next = sinon.stub().returns();

      validateSalesFields(req, res, next);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
    });

    it('Não passa na validação com o campo "quantity" menor que 1', function () {
      const req = { body: [{ productId: 1, quantity: 0 }] };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      const next = sinon.stub().returns();

      validateSalesFields(req, res, next);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});