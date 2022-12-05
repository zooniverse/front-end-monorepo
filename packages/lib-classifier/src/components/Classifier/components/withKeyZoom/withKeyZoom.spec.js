import { Component, createRef } from 'react';
import { mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import { Provider } from 'mobx-react'
import SubjectViewerStore from '@store/SubjectViewerStore'
import withKeyZoom from './withKeyZoom'

describe('withKeyZoom', function () {
  class StubComponent extends Component {
    render () {
      return <p>Hello</p>
    }
  }
  const zoomStub = createRef()
  const WithZoom = withKeyZoom(StubComponent)
  const subjectViewer = SubjectViewerStore.create({})
  const classifierStore = {
    subjectViewer
  }
  const onPan = sinon.stub()
  subjectViewer.setOnPan(onPan)
  const onZoom = sinon.stub()
  subjectViewer.setOnZoom(onZoom)
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
        handler: onZoom.withArgs('zoomin', 1)
      },
      {
        key: '=',
        name: 'zoomIn',
        handler: onZoom.withArgs('zoomin', 1)
      },
      {
        key: '-',
        name: 'zoomOut',
        handler: onZoom.withArgs('zoomout', -1)
      },
      {
        key: '_',
        name: 'zoomOut',
        handler: onZoom.withArgs('zoomout', -1)
      },
      {
        key: 'ArrowRight',
        name: 'pan right',
        handler: onPan.withArgs(1,0)
      },
      {
        key: 'ArrowLeft',
        name: 'pan left',
        handler: onPan.withArgs(-1,0)
      },
      {
        key: 'ArrowUp',
        name: 'pan up',
        handler: onPan.withArgs(0,-1)
      },
      {
        key: 'ArrowDown',
        name: 'pan down',
        handler: onPan.withArgs(0,1)
      }
    ]

    function testAllowedTag(tagName) {
      describe(`when the event target is ${tagName}`, function () {
        afterEach(function () {
          onPan.resetHistory()
          onZoom.resetHistory()
        })

        bindings.forEach(function ({ key, name, handler }) {
          it(`should call ${name} for ${key}`, function () {
            const fakeEvent = {
              key,
              preventDefault: sinon.stub(),
              target: {
                tagName
              }
            }
            wrappedComponent.props.onKeyDown(fakeEvent)
            expect(handler).to.have.been.calledOnce()
          })
        })
      })
    }

    testAllowedTag('SVG')
    testAllowedTag('BUTTON')
    testAllowedTag('G')

    describe('when the event target is something else', function () {
      afterEach(function () {
        onPan.resetHistory()
        onZoom.resetHistory()
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
