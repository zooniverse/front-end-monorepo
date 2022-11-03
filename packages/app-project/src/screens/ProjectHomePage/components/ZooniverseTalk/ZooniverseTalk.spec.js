import { shallow } from 'enzyme'
import { Grid } from 'grommet'

import { ZooniverseTalk } from './ZooniverseTalk'

describe('Component > ZooniverseTalk', function () {
  let wrapper

  before(function () {
    wrapper = shallow(<ZooniverseTalk />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should use a two-column layout', function () {
    const layout = wrapper.find(Grid)
    expect(layout.prop('columns')).to.deep.equal(['1fr', '3fr'])
  })

  describe('on small screens', function () {
    before(function () {
      wrapper.setProps({ screenSize: 'small' })
    })

    after(function () {
      wrapper.setProps({ screenSize: undefined })
    })

    it('should use a one-column layout', function () {
      const layout = wrapper.find(Grid)
      expect(layout.prop('columns')).to.deep.equal(['1fr'])
    })
  })
})
