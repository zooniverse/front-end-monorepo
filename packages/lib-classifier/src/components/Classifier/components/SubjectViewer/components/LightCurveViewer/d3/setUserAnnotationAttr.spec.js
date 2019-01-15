import sinon from 'sinon'

import setUserAnnotationAttr from './setUserAnnotationAttr'

const selectionFixture = {
  attr: Function.prototype,
  style: Function.prototype,
  on: Function.prototype
}
const attrStub = sinon.stub(selectionFixture, 'attr').returnsThis()
const styleStub = sinon.stub(selectionFixture, 'style').returnsThis()
const onStub = sinon.stub(selectionFixture, 'on').returnsThis()

describe('LightCurveViewer > d3 > setUserAnnotationAttr', function () {
  afterEach(function () {
    attrStub.resetHistory()
  })

  it('should exist', function () {
    expect(setUserAnnotationAttr).to.be.a('function')
  })

  it('should add the correct attributes to the selection', function () {
    setUserAnnotationAttr(selectionFixture)
    expect(attrStub.calledWith('class', 'user-annotation')).to.be.true
    expect(attrStub.calledWith('fill', '#c44')).to.be.true
    expect(attrStub.calledWith('fill-opacity', '0.5')).to.be.true
    expect(styleStub.calledWith('cursor', 'pointer')).to.be.true
  })
})
