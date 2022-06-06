import sinon from 'sinon'

import addDataLayer from './addDataLayer'

describe('LightCurveViewer > d3 > addDataLayer', function () {
  let attrStub, appendStub
  const selectionFixture = { append: Function.prototype }

  before(function () {
    attrStub = sinon.stub().returnsThis()
    appendStub = sinon.stub(selectionFixture, 'append')
      .returns({ attr: attrStub })
  })

  afterEach(function () {
    appendStub.resetHistory()
    attrStub.resetHistory()
  })

  it('should exist', function () {
    expect(addDataLayer).to.be.a('function')
  })

  it('should append a group with the correct class to the selection', function () {
    const id = 1
    addDataLayer(selectionFixture, id)
    expect(appendStub.withArgs('g')).to.have.been.calledOnce()
    expect(attrStub.withArgs('class', 'data-layer')).to.have.been.calledOnce()
    expect(attrStub.withArgs('clip-path', `url(#data-mask-${id})`)).to.have.been.calledOnce()
  })
})
