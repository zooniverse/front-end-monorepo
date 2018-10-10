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
    expect(model.eventStream).to.exist
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
})
