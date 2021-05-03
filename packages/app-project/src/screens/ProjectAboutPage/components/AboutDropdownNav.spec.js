import { shallow} from 'enzyme'
import { AboutDropdownNav } from './AboutDropdownNav'

describe('Component > AboutDropdownNav', () => {
  let wrapper

  const router = {
    query: {
      owner: 'test-owner',
      project: 'test-project'
    }
  }

  before(() => {
    wrapper = shallow(<AboutDropdownNav aboutNavLinks={[]} router={router} />)
  })

  it('should render without crashing', () => {
    expect(wrapper).to.be.ok()
  })
})
