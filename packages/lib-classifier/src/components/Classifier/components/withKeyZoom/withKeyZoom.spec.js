import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import { Provider } from 'mobx-react'
import SubjectViewerStore from '@store/SubjectViewerStore'
import withKeyZoom from './withKeyZoom'

describe('withKeyZoom', function () {
  class StubComponent extends React.Component {
    render () {
      return <p>Hello</p>
    }
  }
  const zoomStub = React.createRef()
  const WithZoom = withKeyZoom(StubComponent)
  const subjectViewer = SubjectViewerStore.create({})
  const classifierStore = {
    subjectViewer
  }
  const panLeft = sinon.spy(subjectViewer, 'panLeft')
  const panRight = sinon.spy(subjectViewer, 'panRight')
  const panUp = sinon.spy(subjectViewer, 'panUp')
  const panDown = sinon.spy(subjectViewer, 'panDown')
  const zoomIn = sinon.spy(subjectViewer, 'zoomIn')
  const zoomOut = sinon.spy(subjectViewer, 'zoomOut')
  let wrappedComponent

  before(function () {
    mount(
      <Provider classifierStore={classifierStore}>
        <WithZoom ref={zoomStub} />
      </Provider>
    )
    wrappedComponent = zoomStub.current
  })

  it('should add an onKeyDown handler to wrapped components', function () {
    expect(wrappedComponent.props.onKeyDown).to.be.ok()
  })

  describe('on key down', function () {
    const bindings = [
      {
        key: '+',
        name: 'zoomIn',
        handler: zoomIn
      },
      {
        key: '=',
        name: 'zoomIn',
        handler: zoomIn
      },
      {
        key: '-',
        name: 'zoomOut',
        handler: zoomOut
      },
      {
        key: '_',
        name: 'zoomOut',
        handler: zoomOut
      },
      {
        key: 'ArrowRight',
        name: 'pan right',
        handler: panRight
      },
      {
        key: 'ArrowLeft',
        name: 'pan left',
        handler: panLeft
      },
      {
        key: 'ArrowUp',
        name: 'pan up',
        handler: panUp
      },
      {
        key: 'ArrowDown',
        name: 'pan down',
        handler: panDown
      }
    ]



    describe('when the event target is svg', function () {
      afterEach(function () {
        panLeft.resetHistory()
        panRight.resetHistory()
        panUp.resetHistory()
        panDown.resetHistory()
        zoomIn.resetHistory()
        zoomOut.resetHistory()
      })

      bindings.forEach(function ({ key, name, handler }) {
        it(`should call ${name} for ${key}`, function () {
          const fakeEvent = {
            key,
            preventDefault: sinon.stub(),
            target: {
              tagName: 'svg'
            }
          }
          wrappedComponent.props.onKeyDown(fakeEvent)
          expect(handler).to.have.been.calledOnce()
        })
      })
    })

    describe('when the event target is a button', function () {
      afterEach(function () {
        panLeft.resetHistory()
        panRight.resetHistory()
        panUp.resetHistory()
        panDown.resetHistory()
        zoomIn.resetHistory()
        zoomOut.resetHistory()
      })

      bindings.forEach(function ({ key, name, handler }) {
        it(`should call ${name} for ${key}`, function () {
          const fakeEvent = {
            key,
            preventDefault: sinon.stub(),
            target: {
              tagName: 'BUTTON'
            }
          }
          wrappedComponent.props.onKeyDown(fakeEvent)
          expect(handler).to.have.been.calledOnce()
        })
      })
    })

    describe('when the event target is something else', function () {
      afterEach(function () {
        panLeft.resetHistory()
        panRight.resetHistory()
        panUp.resetHistory()
        panDown.resetHistory()
        zoomIn.resetHistory()
        zoomOut.resetHistory()
      })

      bindings.forEach(function ({ key, name, handler }) {
        it(`should not call ${name} for ${key}`, function () {
          const fakeEvent = {
            key,
            preventDefault: sinon.stub(),
            target: {
              tagName: 'div'
            }
          }
          wrappedComponent.props.onKeyDown(fakeEvent)
          expect(handler).to.not.have.been.called()
        })
      })
    })

    it('should not trap other keys', function () {
      const fakeEvent = {
        key: 'Tab',
        preventDefault: sinon.stub()
      }
      wrappedComponent.props.onKeyDown(fakeEvent)
      expect(fakeEvent.preventDefault).to.have.not.been.called()
    })
  })
})
