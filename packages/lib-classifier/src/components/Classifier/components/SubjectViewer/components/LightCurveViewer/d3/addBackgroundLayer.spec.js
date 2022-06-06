import sinon from 'sinon'

import addBackgroundLayer from './addBackgroundLayer'

describe('LightCurveViewer > d3 > addBackgroundLayer', function () {
  let attrStub, appendStub
  const selectionFixture = { append: Function.prototype }

  const chartStyle = {
    background: '#005d69' // Zooniverse Dark Teal
  }

  before(function () {
    attrStub = sinon.stub().returnsThis()
    appendStub = sinon.stub(selectionFixture, 'append')
    .returns({ attr: attrStub })
  })

  afterEach(function () {
    sinon.resetHistory()
  })

  it('should exist', function () {
    expect(addBackgroundLayer).to.be.a('function')
  })

  it('should append a rect with the correct attributes to the selection', function () {
    addBackgroundLayer(selectionFixture, chartStyle)
    expect(appendStub.withArgs('rect')).to.have.been.calledOnce()
    expect(attrStub.withArgs('width', '100%')).to.have.been.calledOnce()
    expect(attrStub.withArgs('height', '100%')).to.have.been.calledOnce()
    expect(attrStub.withArgs('fill', chartStyle.background)).to.have.been.calledOnce()
  })
})
