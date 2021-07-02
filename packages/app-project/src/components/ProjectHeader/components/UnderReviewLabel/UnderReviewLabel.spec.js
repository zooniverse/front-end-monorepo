import { shallow } from 'enzyme'

import UnderReviewLabel from './UnderReviewLabel'

describe('ProjectHeader > Component >  UnderReviewLabel', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<UnderReviewLabel />)
    expect(wrapper).to.be.ok()
  })
})