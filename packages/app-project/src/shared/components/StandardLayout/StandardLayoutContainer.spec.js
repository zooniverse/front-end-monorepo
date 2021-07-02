import { shallow } from 'enzyme'

import StandardLayoutContainer from './StandardLayoutContainer'

describe('Component > StandardLayoutContainer', function () {
  let wrapper
  before(function () {
    wrapper = shallow(<StandardLayoutContainer.wrappedComponent />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})