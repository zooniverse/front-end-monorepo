import { shallow } from 'enzyme'
import AboutMarkdownz from './AboutMarkdownz'

describe('Component > AboutMarkdownz', function () {
  let wrapper
  before(function () {
    wrapper = shallow(<AboutMarkdownz />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
