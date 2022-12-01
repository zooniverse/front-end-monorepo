import { shallow } from 'enzyme'

import mockStore from '@test/mockStore'
import FullscreenButtonContainer from './FullscreenButtonContainer'

describe('Component > FullscreenButtonContainer', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<FullscreenButtonContainer store={mockStore()} />)
    expect(wrapper).to.be.ok()
  })
})
