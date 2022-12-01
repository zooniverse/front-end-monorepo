import { shallow } from 'enzyme'
import ExpertOptions from './ExpertOptions'

describe('TaskNavButtons > Component > ExpertOptions', function () {
  let wrapper

  before(function () {
    wrapper = shallow(
      <ExpertOptions />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})