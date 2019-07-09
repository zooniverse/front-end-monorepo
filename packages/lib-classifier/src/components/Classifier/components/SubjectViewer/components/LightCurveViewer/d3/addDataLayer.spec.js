import sinon from 'sinon'

import addDataLayer from './addDataLayer'

const selectionFixture = { append: Function.prototype }
const attrStub = sinon.stub().returnsThis()
const appendStub = sinon.stub(selectionFixture, 'append')
  .returns({ attr: attrStub })

describe('LightCurveViewer > d3 > addDataLayer', function () {
  afterEach(function () {
    appendStub.resetHistory()
    attrStub.resetHistory()
  })

  it('should exist', function () {
    expect(addDataLayer).to.be.a('function')
  })

  it('should append a group with the correct class to the selection', function () {
    addDataLayer(selectionFixture)
    expect(appendStub.withArgs('g')).to.have.been.calledOnce()
    expect(attrStub.withArgs('class', 'data-layer')).to.have.been.calledOnce()
  })
})
