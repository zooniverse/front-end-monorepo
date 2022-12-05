import { shallow } from 'enzyme'
import { expect } from 'chai'
import InfoIcon from './InfoIcon'

describe('InfoIcon', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<InfoIcon />)
    expect(wrapper).to.be.ok()
  })
})
