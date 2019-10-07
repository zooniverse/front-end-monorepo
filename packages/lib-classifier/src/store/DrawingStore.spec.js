import DrawingStore from './DrawingStore'

let model

describe('Model > DrawingStore', function () {
  before(function () {
    model = DrawingStore.create()
  })

  it('should exist', function () {
    expect(model).to.be.an('object')
  })

  it('should have an `eventStream` observable', function () {
    expect(model.eventStream).to.be.ok()
    expect(model.eventStream.subscribe).to.be.a('function')
  })

  it('should add new events to the stream on calling `addToStream`', function (done) {
    const newEvent = 'foo'
    model.eventStream.subscribe(value => {
      expect(value).to.equal(newEvent)
      done()
    })
    model.addToStream(newEvent)
  })

  it('should default the active tool index to the first tool in the tools array', function () {
    expect(model.activeDrawingTool).to.equal(0)
  })

  it('should set the active tool index', function () {
    model.setActiveDrawingTool(1)
    expect(model.activeDrawingTool).to.equal(1)
  })

  it('should reset the active tool to 0 when reset is called', function () {
    model.reset()
    expect(model.activeDrawingTool).to.equal(0)
  })
})
