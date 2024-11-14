import { ModelTool } from './../models/ModelTool'

const ANNOTATIONS_MOCK = {
  actions: {
    annotation: {
      add: () => {}
    },
    point: {
      add: () => {}
    }
  }
}

describe('Component > VolumetricViewer > ModelTool', () => {
  const model = ModelTool()

  it('should have initial state', () => {
    expect(model).to.exist()
    expect(model.annotations).to.equal(null)
    expect(model.initialize).to.exist()
    expect(model.events).to.exist()
  })

  it('should initialize()', () => {
    model.initialize({
      annotations: ANNOTATIONS_MOCK
    })
    expect(model.annotations).deep.to.equal(ANNOTATIONS_MOCK)
  })

  it('should call to create a new annotation', (done) => {
    const ev = {
      button: 0,
      point: 1,
      shiftKey: true
    }

    const originalFunc = ANNOTATIONS_MOCK.actions.annotation.add
    const spyFunc = (obj) => {
      // Return to original func
      ANNOTATIONS_MOCK.actions.annotation.add = originalFunc

      expect(obj).deep.to.equal({ point: 1 })
      done()
    }

    ANNOTATIONS_MOCK.actions.annotation.add = spyFunc
    model.events.click(ev)
  })

  it('should call to add a point to an annotation', (done) => {
    const ev = {
      button: 0,
      point: 1,
      shiftKey: false
    }

    const originalFunc = ANNOTATIONS_MOCK.actions.point.add
    const spyFunc = (obj) => {
      // Return to original func
      ANNOTATIONS_MOCK.actions.point.add = originalFunc

      expect(obj).deep.to.equal({ point: 1 })
      done()
    }

    ANNOTATIONS_MOCK.actions.point.add = spyFunc
    model.events.click(ev)
  })
})
