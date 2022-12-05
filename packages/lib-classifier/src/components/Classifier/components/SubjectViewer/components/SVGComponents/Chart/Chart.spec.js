import { shallow } from 'enzyme'

import Chart from './Chart'

describe('Component > Chart', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<Chart><span /></Chart>)
    expect(wrapper).to.be.ok()
  })

  it('should render an svg', function () {
    const wrapper = shallow(<Chart><span /></Chart>)
    expect(wrapper.find('svg')).to.have.lengthOf(1)
  })

  it('should render children', function () {
    const wrapper = shallow(<Chart><span /></Chart>)
    expect(wrapper.children()).to.have.lengthOf(1)
  })

  it('should pass along any other props', function () {
    const wrapper = shallow(<Chart foo='bar'><span /></Chart>)
    expect(wrapper.props().foo).to.equal('bar')
  })
})
