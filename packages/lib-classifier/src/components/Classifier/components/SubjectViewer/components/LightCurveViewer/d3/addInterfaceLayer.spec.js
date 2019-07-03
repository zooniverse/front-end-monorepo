(import sinon from 'sinon'

import addInterfaceLayer from './addInterfaceLayer'

const selectionFixture = { append: Function.prototype }
const attrStub = sinon.stub().returnsThis()
const styleStub = sinon.stub().returnsThis()
const appendStub = sinon.stub(selectionFixture, 'append')
  .returns({
    attr: attrStub,
    style: styleStub
  })

describe('LightCurveViewer > d3 > addInterfaceLayer', function () {
  afterEach(function () {
    appendStub.resetHistory()
    attrStub.resetHistory()
  })

  it('should exist', function () {
    expect(addInterfaceLayer).to.be.a('function')
  })

  it('should append a rect with the correct attributes and style to the selection', function () {
    addInterfaceLayer(selectionFixture)
    expect(appendStub.calledWith('rect')).to.be.true()
    expect(attrStub.calledWith('class', 'interface-layer')).to.be.true()
    expect(attrStub.calledWith('width', '100%')).to.be.true()
    expect(attrStub.calledWith('height', '100%')).to.be.true()
    expect(styleStub.calledWith('fill', 'none')).to.be.true()
    expect(styleStub.calledWith('pointer-events', 'all')).to.be.true()
  })
})
