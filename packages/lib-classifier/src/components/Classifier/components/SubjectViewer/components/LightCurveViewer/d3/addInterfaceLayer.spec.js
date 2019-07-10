import sinon from 'sinon'

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
    expect(appendStub.withArgs('rect')).to.have.been.calledOnce()
    expect(attrStub.withArgs('class', 'interface-layer')).to.have.been.calledOnce()
    expect(attrStub.withArgs('width', '100%')).to.have.been.calledOnce()
    expect(attrStub.withArgs('height', '100%')).to.have.been.calledOnce()
    expect(styleStub.withArgs('fill', 'none')).to.have.been.calledOnce()
    expect(styleStub.withArgs('pointer-events', 'all')).to.have.been.calledOnce()
  })
})
