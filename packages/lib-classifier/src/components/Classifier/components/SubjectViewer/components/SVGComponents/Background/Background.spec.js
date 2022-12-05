import { shallow } from 'enzyme'

import Background from './Background'

describe('Component > Background', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<Background />)
    expect(wrapper).to.be.ok()
  })

  it('should render a rect', function () {
    const wrapper = shallow(<Background />)
    expect(wrapper.find('rect')).to.have.lengthOf(1)
  })

  it('should pass along any other props', function () {
    const wrapper = shallow(<Background foo='bar' />)
    expect(wrapper.find('rect').props().foo).to.equal('bar')
  })

  it('should set the fill color by prop', function () {
    const wrapper = shallow(<Background fill='black' />)
    expect(wrapper.find('rect').props().fill).to.equal('black')
  })

  it('should set the stroke properties if a borderColor is defined', function () {
    let rect
    const wrapper = shallow(<Background fill='black' />)
    rect = wrapper.find('rect')
    expect(rect.props().stroke).to.be.empty()
    expect(rect.props().strokeWidth).to.be.equal(0)
    wrapper.setProps({ borderColor: '#ffffff' })
    rect = wrapper.find('rect')
    expect(rect.props().stroke).to.equal('#ffffff')
    expect(rect.props().strokeWidth).to.be.equal(1)
  })

  describe('when there are underlays', function () {
    it('should render multiple rects', function () {
      const underlayParameters = [
        { fill: '#000000', left: 5, width: 10 }
      ]
      const wrapper = shallow(<Background fill='white' underlayParameters={underlayParameters} />)
      expect(wrapper.find('rect')).to.have.lengthOf(2)
    })

    it('should render the underlay rects with the specified parameters', function () {
      let underlayRect
      const underlayParameters = [
        { fill: '#000000', left: 5, width: 10 }
      ]
      const wrapper = shallow(<Background fill='white' underlayParameters={underlayParameters} />)
      underlayRect = wrapper.find('rect').last()
      expect(underlayRect.props().fill).to.equal(underlayParameters[0].fill)
      expect(underlayRect.props().transform).to.equal(`translate(${underlayParameters[0].left}, 0)`)
      expect(underlayRect.props().width).to.equal(underlayParameters[0].width)
      wrapper.setProps({ borderColor: 'blue' })
      underlayRect = wrapper.find('rect').last()
      expect(underlayRect.props().fill).to.equal(underlayParameters[0].fill)
      expect(underlayRect.props().transform).to.equal(`translate(${underlayParameters[0].left}, 1)`)
      expect(underlayRect.props().width).to.equal(underlayParameters[0].width)
    })
  })
})
