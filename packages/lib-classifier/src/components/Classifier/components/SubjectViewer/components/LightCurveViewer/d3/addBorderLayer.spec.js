import sinon from 'sinon'

import addBorderLayer from './addBorderLayer'

describe('LightCurveViewer > d3 > addBorderLayer', function () {
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
    expect(addBorderLayer).to.be.a('function')
  })

  it('should append a rect with the correct attributes to the selection', function () {
    addBorderLayer(selectionFixture)
    expect(appendStub.withArgs('rect')).to.have.been.calledOnce()
    expect(attrStub.withArgs('width', '100%')).to.have.been.calledOnce()
    expect(attrStub.withArgs('height', '100%')).to.have.been.calledOnce()
    expect(attrStub.withArgs('fill', 'none')).to.have.been.calledOnce()
    expect(attrStub.withArgs('stroke', '#444')).to.have.been.calledOnce()
    expect(attrStub.withArgs('stroke-width', '2')).to.have.been.calledOnce()
  })
})
