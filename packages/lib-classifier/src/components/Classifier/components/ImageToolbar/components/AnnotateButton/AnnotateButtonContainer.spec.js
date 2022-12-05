import { shallow } from 'enzyme'

import mockStore from '@test/mockStore'
import AnnotateButtonContainer from './AnnotateButtonContainer'

describe('Component > AnnotateButtonContainer', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<AnnotateButtonContainer store={mockStore()} />)
    expect(wrapper).to.be.ok()
  })
})
