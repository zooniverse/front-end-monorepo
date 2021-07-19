import { render } from 'enzyme'

import AboutProject from './AboutProject'

const PROJECT_DESCRIPTION = 'This is a test project'
const PROJECT_NAME = 'A test project'

describe('Component > AboutProject', function () {
  let wrapper

  before(function () {
    wrapper = render(<AboutProject description={PROJECT_DESCRIPTION} projectName={PROJECT_NAME} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should show the title', function () {
    const titleWrapper = wrapper.find('h2')
    expect(titleWrapper.text()).to.equal(`About ${PROJECT_NAME}`)
  })

  it('should show the description', function () {
    const descriptionWrapper = wrapper.find('p')
    expect(descriptionWrapper.text()).to.equal(PROJECT_DESCRIPTION)
  })
})
