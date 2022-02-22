import { shallow } from 'enzyme'

import AboutProject from './AboutProject'
import AboutProjectContainer from './AboutProjectContainer'

let wrapper
let AboutProjectWrapper

const PROJECT_DESCRIPTION = 'This is a test project'
const PROJECT_NAME = 'A test project'

describe('Component > CompletionBarContainer', function () {
  before(function () {
    wrapper = shallow(
      <AboutProjectContainer
        description={PROJECT_DESCRIPTION}
        projectName={PROJECT_NAME}
      />
    )
    AboutProjectWrapper = wrapper.find(AboutProject)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `AboutProject` component', function () {
    expect(AboutProjectWrapper).to.have.lengthOf(1)
  })

  it('should pass through a `description` prop', function () {
    expect(AboutProjectWrapper.prop('description')).to.equal(PROJECT_DESCRIPTION)
  })

  it('should pass through a `projectName` prop', function () {
    expect(AboutProjectWrapper.prop('projectName')).to.equal(PROJECT_NAME)
  })
})
