import { shallow } from 'enzyme'

import mockStore from '@test/mockStore'
import ResetButtonContainer from './ResetButtonContainer'

describe('Component > ResetButtonContainer', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<ResetButtonContainer store={mockStore()} />)
    expect(wrapper).to.be.ok()
  })
})
