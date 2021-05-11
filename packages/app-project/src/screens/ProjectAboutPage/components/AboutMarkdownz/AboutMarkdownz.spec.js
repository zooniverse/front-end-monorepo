import { shallow } from 'enzyme'

import AboutMarkdownz from './AboutMarkdownz'

describe.only('Component > ProjectHomePage', function () {
  let wrapper
  before(function () {
    wrapper = shallow(<AboutMarkdownz />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
