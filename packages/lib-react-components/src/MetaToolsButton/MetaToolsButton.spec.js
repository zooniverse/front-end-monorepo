import { shallow } from 'enzyme'
import { expect } from 'chai'
import { MetaToolsButton, StyledPlainButton } from './MetaToolsButton'

describe('MetaToolsButton', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<MetaToolsButton />)
    expect(wrapper).to.be.ok()
  })

  it('should render a StyledPlainButton', function () {
    const wrapper = shallow(<MetaToolsButton />)
    expect(wrapper.find(StyledPlainButton)).to.have.lengthOf(1)
  })
})
