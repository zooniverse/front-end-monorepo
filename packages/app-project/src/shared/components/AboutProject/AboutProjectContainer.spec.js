import { shallow } from 'enzyme'
import React from 'react'

import AboutProject from './AboutProject'
import AboutProjectContainer from './AboutProjectContainer'

let wrapper
let AboutProjectWrapper

const PROJECTNAME = 'Project name'
const DESCRIPTION = 'This is my description'

describe('Component > CompletionBarContainer', function() {
  before(function() {
    wrapper = shallow(
      <AboutProjectContainer.wrappedComponent
        description={DESCRIPTION}
        projectName={PROJECTNAME}
      />
    )
    AboutProjectWrapper = wrapper.find(AboutProject)
  })

  it('should render without crashing', function() {
    expect(wrapper).to.be.ok()
  })

  it('should render the `AboutProject` component', function() {
    expect(AboutProjectWrapper).to.have.lengthOf(1)
  })

  it('should pass through a `description` prop', function() {
    expect(AboutProjectWrapper.prop('description')).to.equal(DESCRIPTION)
  })

  it('should pass through a `projectName` prop', function() {
    expect(AboutProjectWrapper.prop('projectName')).to.equal(PROJECTNAME)
  })
})
