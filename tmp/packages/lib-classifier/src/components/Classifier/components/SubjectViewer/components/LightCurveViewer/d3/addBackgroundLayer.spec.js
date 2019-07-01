import sinon from 'sinon'

import addBackgroundLayer from './addBackgroundLayer'

const selectionFixture = { append: Function.prototype }
const attrStub = sinon.stub().returnsThis()
const appendStub = sinon.stub(selectionFixture, 'append')
  .returns({ attr: attrStub })

const chartStyle = {
  background: '#005d69' // Zooniverse Dark Teal
}

describe('LightCurveViewer > d3 > addBackgroundLayer', function () {
  afterEach(function () {
    appendStub.resetHistory()
    attrStub.resetHistory()
  })

  it('should exist', function () {
    expect(addBackgroundLayer).to.be.a('function')
  })

  it('should append a rect with the correct attributes to the selection', function () {
    addBackgroundLayer(selectionFixture, chartStyle)
    expect(appendStub.calledWith('rect')).to.be.true
    expect(attrStub.calledWith('width', '100%')).to.be.true
    expect(attrStub.calledWith('height', '100%')).to.be.true
    expect(attrStub.calledWith('fill', chartStyle.background)).to.be.true
  })
})
