import { shallow } from 'enzyme'
import { expect } from 'chai'
import HeartIcon from './HeartIcon'

describe('HeartIcon', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<HeartIcon />)
    expect(wrapper).to.be.ok()
  })
})
