import { shallow } from 'enzyme'

import AboutProject from './AboutProject'
import AboutProjectContainer from './AboutProjectContainer'

describe('Component > AboutProjectContainer', function () {
  let wrapper
  let AboutProjectWrapper
  const stores = {
    store: {
      project: {
        introduction: 'This is a test project',
        display_name: 'A test project'
      }
    }
  }

  before(function () {
    wrapper = shallow(
      <AboutProjectContainer stores={stores} />
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
    expect(AboutProjectWrapper.prop('description')).to.equal(stores.store.project.introduction)
  })

  it('should pass through a `projectName` prop', function () {
    expect(AboutProjectWrapper.prop('projectName')).to.equal(stores.store.project.display_name)
  })
})
