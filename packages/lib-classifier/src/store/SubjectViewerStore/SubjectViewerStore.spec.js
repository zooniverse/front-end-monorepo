import sinon from 'sinon'
import asyncStates from '@zooniverse/async-states'

import { SubjectFactory } from '@test/factories'
import mockStore from '@test/mockStore'
import SubjectViewerStore from './SubjectViewerStore'

describe('Model > SubjectViewerStore', function () {
  it('should exist', function () {
    expect(SubjectViewerStore).toBeDefined()
    expect(SubjectViewerStore).to.be.an('object')
  })

  describe('frame', function () {
    let subjectViewerStore

    beforeEach(function () {
      subjectViewerStore = SubjectViewerStore.create()
    })

    it('should have a `frame` property', function () {
      expect(subjectViewerStore.frame).to.equal(0)
    })

    it('should have a setFrame method', function () {
      expect(subjectViewerStore.setFrame).to.be.a('function')
    })

    it('should update frame with setFrame method', function () {
      expect(subjectViewerStore.frame).to.equal(0)
      subjectViewerStore.setFrame(1)
      expect(subjectViewerStore.frame).to.equal(1)
    })
  })

  describe('Views > disableImageToolbar', function () {
    describe('when the frame is a subject location of type image', function () {
      let subjectViewerStore

      const subjectSnapshot = SubjectFactory.build({ locations: [{ 'image/png': 'https://foo.bar/example.png' }] })

      before(function () {
        const store = mockStore({ subject: subjectSnapshot })
        subjectViewerStore = store.subjectViewer
      })

      it('should return false', function () {
        expect(subjectViewerStore.disableImageToolbar).to.equal(false)
      })
    })

    describe('when the frame is a subject location of type text', function () {
      let subjectViewerStore

      const subjectSnapshot = SubjectFactory.build({ locations: [{ 'text/plain': 'https://foo.bar/subjectText.txt' }] })

      before(function () {
        const store = mockStore({ subject: subjectSnapshot })
        subjectViewerStore = store.subjectViewer
      })

      it('should return true', function () {
        expect(subjectViewerStore.disableImageToolbar).to.equal(true)
      })
    })

    describe('when the frame is a subject location of type video', function () {
      let subjectViewerStore

      const subjectSnapshot = SubjectFactory.build({ locations: [{ 'video/mp4': 'https://foo.bar/subjectVideo.mp4' }] })

      before(function () {
        const store = mockStore({ subject: subjectSnapshot })
        subjectViewerStore = store.subjectViewer
      })

      it('should return true', function () {
        expect(subjectViewerStore.disableImageToolbar).to.equal(true)
      })
    })
  })

  describe('Actions > enableRotation', function () {
    let subjectViewerStore

    before(function () {
      subjectViewerStore = SubjectViewerStore.create()
    })

    it('should enable subject rotation', function () {
      expect(subjectViewerStore.rotationEnabled).to.equal(false)
      subjectViewerStore.enableRotation()
      expect(subjectViewerStore.rotationEnabled).to.equal(true)
    })
  })

  describe('Actions > rotate', function () {
    let subjectViewerStore

    before(function () {
      subjectViewerStore = SubjectViewerStore.create()
    })

    it('should rotate the subject by -90 degrees', function () {
      expect(subjectViewerStore.rotation).to.equal(0)
      subjectViewerStore.rotate()
      expect(subjectViewerStore.rotation).to.equal(-90)
      subjectViewerStore.resetView()
    })
  })

  describe('Actions > resetSubject', function () {
    let subjectViewerStub
    let subjectViewerStore

    before(function () {
      subjectViewerStub = {
        loadingState: asyncStates.success,
        dimensions: [
          { clientHeight: 200, clientWidth: 200, naturalHeight: 200, naturalWidth: 200 }
        ]
      }
      subjectViewerStore = SubjectViewerStore.create(subjectViewerStub)
    })

    it('should reset the loading state and subject dimensions when there is a new active subject', function () {
      expect(subjectViewerStore.loadingState).to.equal(subjectViewerStub.loadingState)
      expect(subjectViewerStore.dimensions).to.deep.equal(subjectViewerStub.dimensions)
      subjectViewerStore.resetSubject()
      expect(subjectViewerStore.loadingState).to.equal(asyncStates.loading)
      expect(subjectViewerStore.dimensions).to.have.lengthOf(0)
    })

    it('should reset the invert when there is a new active subject', function () {
      subjectViewerStore.invertView()
      expect(subjectViewerStore.invert).to.equal(true)
      subjectViewerStore.resetSubject()
      expect(subjectViewerStore.invert).to.equal(false)
    })

    it('should reset the rotation angle when there is a new active subject', function () {
      subjectViewerStore.rotate()
      expect(subjectViewerStore.rotation).to.equal(-90)
      subjectViewerStore.resetSubject()
      expect(subjectViewerStore.rotation).to.equal(0)
    })

    it('should reset the rotation angle when subject is ready', function () {
      subjectViewerStore.rotate()
      expect(subjectViewerStore.rotation).to.equal(-90)
      subjectViewerStore.onSubjectReady()
      expect(subjectViewerStore.rotation).to.equal(0)
    })

    describe('when the subject has no default frame', function () {
      it('should have the store frame as 0', function () {
        const subject = SubjectFactory.build()
        subjectViewerStore.resetSubject(subject)
        expect(subjectViewerStore.frame).to.equal(0)
      })
    })

    describe('when the subject has a default frame of 2', function () {
      it('should save frame 2 in the store as index 1', function () {
        const subjectWithDefaultFrame = SubjectFactory.build({
          metadata: { default_frame: 2 }
        })
        subjectViewerStore.resetSubject(subjectWithDefaultFrame)
        expect(subjectViewerStore.frame).to.equal(1)
      })
    })
  })

  describe('Actions > resetView', function () {
    let subjectViewerStore

    before(function () {
      subjectViewerStore = SubjectViewerStore.create()
    })

    it('should reset subject rotation', function () {
      subjectViewerStore.rotate()
      subjectViewerStore.resetView()
      expect(subjectViewerStore.rotation).to.equal(0)
    })
  })

  describe('Actions > setFlipbookSpeed', function () {
    let subjectViewerStore

    before(function () {
      subjectViewerStore = SubjectViewerStore.create()
    })

    it('should set a new flipbook speed', function () {
      expect(subjectViewerStore.flipbookSpeed).to.equal(1)
      subjectViewerStore.setFlipbookSpeed(2)
      expect(subjectViewerStore.flipbookSpeed).to.equal(2)
    })
  })

  describe('Actions > setVideoSpeed', function () {
    let subjectViewerStore

    before(function () {
      subjectViewerStore = SubjectViewerStore.create()
    })

    it('should set a new video playback speed', function () {
      expect(subjectViewerStore.videoSpeed).to.equal('1x')
      subjectViewerStore.setVideoSpeed('0.5x')
      expect(subjectViewerStore.videoSpeed).to.equal('0.5x')
    })
  })

  describe('Actions > setVolume', function () {
    let subjectViewerStore

    before(function () {
      subjectViewerStore = SubjectViewerStore.create()
    })

    it('should set a new volume', function () {
      expect(subjectViewerStore.volume).to.equal(1)
      subjectViewerStore.setVolume(0.5)
      expect(subjectViewerStore.volume).to.equal(0.5)
    })
  })

  describe('With zoom', function () {
    let subjectViewerStore
    let onZoom

    before(function () {
      onZoom = sinon.stub()
      subjectViewerStore = SubjectViewerStore.create()
      subjectViewerStore.setOnZoom(onZoom)
    })

    afterEach(function () {
      onZoom.resetHistory()
    })

    it('should support zooming in', function () {
      subjectViewerStore.zoomIn()
      expect(onZoom.withArgs('zoomin', 1)).to.have.been.calledOnce()
    })

    it('should support zooming out', function () {
      subjectViewerStore.zoomOut()
      expect(onZoom.withArgs('zoomout', -1)).to.have.been.calledOnce()
    })

    it('should reset the zoom level on reset', function () {
      subjectViewerStore.resetView()
      expect(onZoom.withArgs('zoomto', 1)).to.have.been.calledOnce()
    })
  })

  describe('With panning', function () {
    let subjectViewerStore
    let onPan

    before(function () {
      onPan = sinon.stub()
      subjectViewerStore = SubjectViewerStore.create()
      subjectViewerStore.setOnPan(onPan)
    })

    afterEach(function () {
      onPan.resetHistory()
    })

    it('should pan left', function () {
      subjectViewerStore.panLeft()
      expect(onPan.withArgs(-1, 0)).to.have.been.calledOnce()
    })

    it('should pan right', function () {
      subjectViewerStore.panRight()
      expect(onPan.withArgs(1, 0)).to.have.been.calledOnce()
    })

    it('should pan up', function () {
      subjectViewerStore.panUp()
      expect(onPan.withArgs(0, -1)).to.have.been.calledOnce()
    })

    it('should pan down', function () {
      subjectViewerStore.panDown()
      expect(onPan.withArgs(0, 1)).to.have.been.calledOnce()
    })
  })

  describe('error handling', function () {
    let subjectViewerStore
    let errorSpy
    before(function () {
      errorSpy = sinon.spy(console, 'error')
      subjectViewerStore = SubjectViewerStore.create()
    })

    after(function () {
      errorSpy.restore()
    })

    it('should set the loading state to error', function () {
      try {
        subjectViewerStore.onError(new Error('load error'))
      } catch (error) {
        expect(subjectViewerStore.loadingState).to.equal(asyncStates.error)
      }
    })

    it('should log the error', function () {
      try {
        subjectViewerStore.onError(new Error('load error'))
      } catch (error) {
        expect(errorSpy).to.have.been.calledOnceWith('load error')
      }
    })
  })
})
