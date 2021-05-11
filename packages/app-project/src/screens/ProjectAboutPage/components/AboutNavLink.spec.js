import { shallow } from 'enzyme'

import AboutNavLink from './AboutNavLink'

describe.only('Component > ProjectHomePage', function () {
  let wrapper
  before(function () {
    wrapper = shallow(<AboutNavLink />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
