import sinon from 'sinon'

import addBorderLayer from './addBorderLayer'

const selectionFixture = { append: Function.prototype }
const attrStub = sinon.stub().returnsThis()
const appendStub = sinon.stub(selectionFixture, 'append')
  .returns({ attr: attrStub })

describe('LightCurveViewer > d3 > addBorderLayer', function () {
  afterEach(function () {
    appendStub.resetHistory()
    attrStub.resetHistory()
  })

  it('should exist', function () {
    expect(addBorderLayer).to.be.a('function')
  })

  it('should append a rect with the correct attributes to the selection', function () {
    addBorderLayer(selectionFixture)
    expect(appendStub.calledWith('rect')).to.be.true
    expect(attrStub.calledWith('width', '100%')).to.be.true
    expect(attrStub.calledWith('height', '100%')).to.be.true
    expect(attrStub.calledWith('fill', 'none')).to.be.true
    expect(attrStub.calledWith('stroke', '#444')).to.be.true
    expect(attrStub.calledWith('stroke-width', '2')).to.be.true
  })
})
