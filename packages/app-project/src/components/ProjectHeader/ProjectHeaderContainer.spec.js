import { shallow } from 'enzyme'
import React from 'react'
import { projects } from '@zooniverse/panoptes-js'

import ProjectHeaderContainer from './ProjectHeaderContainer'
import ProjectHeader from './ProjectHeader'

let wrapper
let componentWrapper

const PROJECT = projects.mocks.resources.projectOne
const OWNER = 'foo'
const PROJECT_SLUG = 'bar'
const ROUTER = {
  query: {
    owner: OWNER,
    project: PROJECT_SLUG,
    subroute: ['baz']
  }
}

describe('Component > ProjectHeaderContainer', function () {
  before(function () {
    wrapper = shallow(<ProjectHeaderContainer.wrappedComponent
      project={PROJECT}
      router={ROUTER}
    />)
    componentWrapper = wrapper.dive().find(ProjectHeader)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `ProjectHeader` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  it('should pass down the project title', function () {
    expect(componentWrapper.prop('title')).to.equal(PROJECT.display_name)
  })

  it('should pass down the project homepage href if on another page', function () {
    expect(componentWrapper.prop('href')).to.equal(`/projects/${OWNER}/${PROJECT_SLUG}`)
  })

  it(`shouldn't pass down an href if on the home page`, function () {
    const HOME_ROUTER = Object.assign({}, ROUTER)
    delete HOME_ROUTER.query.subroute
    const onHomePageWrapper = shallow(<ProjectHeaderContainer.wrappedComponent
      project={PROJECT}
      router={HOME_ROUTER}
    />)
    const onHomePageComponentWrapper = onHomePageWrapper.dive().find(ProjectHeader)
    expect(onHomePageComponentWrapper.prop('href')).to.equal('')
  })
})
