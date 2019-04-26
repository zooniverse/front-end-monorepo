import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import withKeyZoom from './withKeyZoom'

describe('withKeyZoom', function () {
  function StubComponent () {
    return <p>Hello</p>
  }
  const WithZoom = withKeyZoom(StubComponent)
  let wrapper

  before(function () {
    wrapper = shallow(<WithZoom.wrappedComponent />)
  })

  it('should add an onKeyDown handler to wrapped components', function () {
    expect(wrapper.props().onKeyDown).to.exist
  })

  describe('on key down', function () {
    const onPan = sinon.stub()
    const zoomIn = sinon.stub()
    const zoomOut = sinon.stub()
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

    before(function () {
      wrapper = shallow(
        <WithZoom.wrappedComponent
          onPan={onPan}
          zoomIn={zoomIn}
          zoomOut={zoomOut}
        />)
    })

    afterEach(function () {
      zoomIn.resetHistory()
      zoomOut.resetHistory()
    })

    bindings.forEach(function ({ key, name, handler }) {
      it(`should call ${name} for ${key}`, function () {
        const fakeEvent = {
          key
        }
        wrapper.simulate('keydown', fakeEvent)
        expect(handler).to.have.been.calledOnce
      })
    })
  })
})
