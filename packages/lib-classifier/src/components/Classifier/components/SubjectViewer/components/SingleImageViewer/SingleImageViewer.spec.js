import { shallow } from 'enzyme'

import SingleImageViewer from './SingleImageViewer'
import InteractionLayer from '../InteractionLayer'

let wrapper

describe('Component > SingleImageViewer', function () {
  beforeEach(function () {
    wrapper = shallow(<SingleImageViewer height={200} width={100} viewBox='0 0 100 100' />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should be upright', function () {
    const transform = wrapper.find('g[transform]').prop('transform')
    expect(transform).to.have.string('rotate(0 50 100)')
  })

  describe('with a rotation angle', function () {
    beforeEach(function () {
      wrapper.setProps({ rotate: -90 })
    })

    it('should be rotated', function () {
      const transform = wrapper.find('g[transform]').prop('transform')
      expect(transform).to.have.string('rotate(-90 50 100)')
    })
  })

  describe('with interaction layer', function () {
    it('should default to render the InteractionLayer', function () {
      expect(wrapper.find(InteractionLayer)).to.have.lengthOf(1)
    })

    it('should be possible to disable the render of the InteractionLayer by prop', function () {
      expect(wrapper.find(InteractionLayer)).to.have.lengthOf(1)
      wrapper.setProps({ enableInteractionLayer: false })
      expect(wrapper.find(InteractionLayer)).to.have.lengthOf(0)
      wrapper.setProps({ enableInteractionLayer: true })
    })
  })
})
