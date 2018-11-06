import sinon from 'sinon'

import setPointStyle from './setPointStyle'

const selectionFixture = { attr: Function.prototype }
const attrStub = sinon.stub(selectionFixture, 'attr').returnsThis()

describe('LightCurveViewer > d3 > setPointStyle', function () {
  afterEach(function () {
    attrStub.resetHistory()
  })

  it('should exist', function () {
    expect(setPointStyle).to.be.a('function')
  })

  it('should add the correct attributes to the selection', function () {
    setPointStyle(selectionFixture)
    expect(attrStub.calledWith('r', 1)).to.be.true
    expect(attrStub.calledWith('class', 'data-point')).to.be.true
    expect(attrStub.calledWith('fill', '#3cc')).to.be.true
  })
})
