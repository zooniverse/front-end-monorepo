import sinon from 'sinon'

import setDataPointStyle from './setDataPointStyle'

const selectionFixture = { attr: Function.prototype }
const attrStub = sinon.stub(selectionFixture, 'attr').returnsThis()

const chartStyle = {
  color: '#eff2f5', // Zooniverse Light Grey
  dataPointSize: '1.5'
}

describe('LightCurveViewer > d3 > setDataPointStyle', function () {
  afterEach(function () {
    attrStub.resetHistory()
  })

  it('should exist', function () {
    expect(setDataPointStyle).to.be.a('function')
  })

  it('should add the correct attributes to the selection', function () {
    setDataPointStyle(selectionFixture, chartStyle)
    expect(attrStub.calledWith('r', chartStyle.dataPointSize)).to.be.true
    expect(attrStub.calledWith('class', 'data-point')).to.be.true
    expect(attrStub.calledWith('fill', chartStyle.color)).to.be.true
  })
})
