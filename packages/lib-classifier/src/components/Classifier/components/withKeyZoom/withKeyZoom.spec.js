import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import { Provider } from 'mobx-react'
import withKeyZoom from './withKeyZoom'

describe('withKeyZoom', function () {
  class StubComponent extends React.Component {
    render () {
      return <p>Hello</p>
    }
  }
  const zoomStub = React.createRef()
  const WithZoom = withKeyZoom(StubComponent)
  const onPan = sinon.stub()
  const zoomIn = sinon.stub()
  const zoomOut = sinon.stub()
  const classifierStore = {
    subjectViewer: {
      onPan,
      zoomIn,
      zoomOut
    }
  }
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
        handler: onPan.withArgs(-1, 0)
      },
      {
        key: 'ArrowLeft',
        name: 'pan left',
        handler: onPan.withArgs(1, 0)
      }
    ]

    afterEach(function () {
      zoomIn.resetHistory()
      zoomOut.resetHistory()
    })

    bindings.forEach(function ({ key, name, handler }) {
      it(`should call ${name} for ${key}`, function () {
        const fakeEvent = {
          key
        }
        wrappedComponent.props.onKeyDown(fakeEvent)
        expect(handler).to.have.been.calledOnce()
      })
    })
  })
})
