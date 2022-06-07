import sinon from 'sinon'

import setDataPointStyle from './setDataPointStyle'

describe('LightCurveViewer > d3 > setDataPointStyle', function () {
  let attrStub

  const selectionFixture = { attr: Function.prototype }
  const chartStyle = {
    color: '#eff2f5', // Zooniverse Light Grey
    dataPointSize: '1.5'
  }

  before(function () {
    attrStub = sinon.stub(selectionFixture, 'attr').returnsThis()
  })

  afterEach(function () {
    attrStub.resetHistory()
  })

  it('should exist', function () {
    expect(setDataPointStyle).to.be.a('function')
  })

  it('should add the correct attributes to the selection', function () {
    setDataPointStyle(selectionFixture, chartStyle)
    expect(attrStub.withArgs('r', chartStyle.dataPointSize)).to.have.been.calledOnce()
    expect(attrStub.withArgs('class', 'data-point')).to.have.been.calledOnce()
    expect(attrStub.withArgs('fill', chartStyle.color)).to.have.been.calledOnce()
  })
})
