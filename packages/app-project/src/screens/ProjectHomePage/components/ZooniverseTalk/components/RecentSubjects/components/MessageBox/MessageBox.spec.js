import { shallow } from 'enzyme'

import MessageBox from './MessageBox'

describe('Component > MessageBox', function () {
  let wrapper

  before(function () {
    wrapper = shallow(<MessageBox />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
