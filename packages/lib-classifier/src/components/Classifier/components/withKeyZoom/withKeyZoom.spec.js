import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import withKeyZoom from './withKeyZoom'

describe('withKeyZoom', function () {
  function StubComponent () {
    return <p>Hello</p>
  }
  const WithZoom = withKeyZoom(StubComponent)
  const onPan = sinon.stub()
  const zoomIn = sinon.stub()
  const zoomOut = sinon.stub()
  const context = {
    mobxStores: {
      classifierStore: {
        subjectViewer: {
          onPan,
          zoomIn,
          zoomOut
        }
      }
    }
  }
  let wrapper

  before(function () {
    wrapper = mount(<WithZoom />, { context })
  })

  it('should add an onKeyDown handler to wrapped components', function () {
    expect(wrapper.find(StubComponent).props().onKeyDown).to.exist
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
        wrapper.find(StubComponent).props().onKeyDown(fakeEvent)
        expect(handler).to.have.been.calledOnce
      })
    })
  })
})
