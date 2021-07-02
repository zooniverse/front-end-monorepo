import { shallow } from 'enzyme'
import { expect } from 'chai'
import CollectionsIcon from './CollectionsIcon'

describe('CollectionsIcon', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<CollectionsIcon />)
    expect(wrapper).to.be.ok()
  })
})
