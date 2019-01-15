import sinon from 'sinon'

import setDataPointStyle from './setDataPointStyle'

const selectionFixture = { attr: Function.prototype }
const attrStub = sinon.stub(selectionFixture, 'attr').returnsThis()

describe('LightCurveViewer > d3 > setDataPointStyle', function () {
  afterEach(function () {
    attrStub.resetHistory()
  })

  it('should exist', function () {
    expect(setDataPointStyle).to.be.a('function')
  })

  it('should add the correct attributes to the selection', function () {
    setDataPointStyle(selectionFixture)
    expect(attrStub.calledWith('r', 1.25)).to.be.true
    expect(attrStub.calledWith('class', 'data-point')).to.be.true
    expect(attrStub.calledWith('fill', '#488')).to.be.true
  })
})
