import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import { Layer } from 'grommet'
import withLayer from './withLayer'

function Component () {(
  <div>
    Leo mollis dictum id dis maecenas consectetur metus elementum vivamus nisl, suscipit tristique lectus nulla mus etiam nisi facilisis magnis, scelerisque ligula montes luctus cursus nibh vulputate parturient risus.
  </div>
)}

describe('HOC > withLayer', function () {
  let WrappedComponent
  before(function () {
    WrappedComponent = withLayer(Component)
  })

  it('should render without crashing', function () {
    const wrapper = shallow(<WrappedComponent />)
    expect(wrapper).to.be.ok()
  })

  describe('when inactive', function () {
    it('should render null', function () {
      const wrapper = shallow(<WrappedComponent />)
      expect(wrapper.type()).to.be.null()
    })
  })

  describe('when rendering server side', function () {
    let oldDocument
    before(function () {
      oldDocument = global.document
      global.document = undefined
    })

    after(function () {
      global.document = oldDocument
    })

    it('should render null', function () {
      const wrapper = shallow(<WrappedComponent active />)

      expect(wrapper.type()).to.be.null()
    })
  })

  describe('when active and client side rendering', function () {
    it('should set the isBrowser state to true on mount', function () {
      const wrapper = shallow(<WrappedComponent active />)
      expect(wrapper.state().isBrowser).to.be.true()
    })

    it('should render the child component wrapped with a Layer', function () {
      const wrapper = shallow(<WrappedComponent active />)
      const layerWrapper = wrapper.find(Layer)
      expect(layerWrapper).to.have.lengthOf(1)
      expect(layerWrapper.find(Component)).to.have.lengthOf(1)
    })

    it('should set the Layer props', function () {
      const props = {
        active: true,
        closeFn: sinon.spy(),
        modal: false,
        position: 'right'
      }

      const wrapper = shallow(<WrappedComponent {...props} />)
      expect(wrapper.find(Layer).props().onClickOutside).to.equal(props.closeFn)
      expect(wrapper.find(Layer).props().onEsc).to.equal(props.closeFn)
      expect(wrapper.find(Layer).props().modal).to.equal(props.modal)
      expect(wrapper.find(Layer).props().position).to.equal(props.position)
    })

    it('should pass props to the wrapped component', function () {
      const props = {
        active: true,
        closeFn: sinon.spy()
      }
      const wrapper = shallow(<WrappedComponent {...props} />)
      expect(wrapper.find(Layer).find(Component).props().closeFn).to.equal(props.closeFn)
    })
  })
})