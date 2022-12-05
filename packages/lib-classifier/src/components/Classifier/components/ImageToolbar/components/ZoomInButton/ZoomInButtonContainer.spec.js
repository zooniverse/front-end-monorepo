import { shallow } from 'enzyme'

import mockStore from '@test/mockStore'
import ZoomInButtonContainer from './ZoomInButtonContainer'

describe('Component > ZoomInButtonContainer', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<ZoomInButtonContainer store={mockStore()} />)
    expect(wrapper).to.be.ok()
  })
})
