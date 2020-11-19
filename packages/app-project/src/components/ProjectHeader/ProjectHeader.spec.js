import { shallow } from 'enzyme'
import React from 'react'

import { ProjectHeader } from './ProjectHeader'
import Avatar from './components/Avatar'
import ProjectTitle from './components/ProjectTitle'
import ApprovedIcon from './components/ApprovedIcon'
import UnderReviewLabel from './components/UnderReviewLabel'

const TITLE = 'Project title'

describe('Component > ProjectHeader', function () {
  let wrapper

  before(function () {
    wrapper = shallow(<ProjectHeader title={TITLE} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render a `<Avatar />` component', function () {
    expect(wrapper.find(Avatar)).to.have.lengthOf(1)
  })

  it('should render a `<ProjectTitle />` component', function () {
    expect(wrapper.find(ProjectTitle)).to.have.lengthOf(1)
  })

  it('should render a `<ApprovedIcon />` component', function () {
    expect(wrapper.find(ApprovedIcon)).to.have.lengthOf(1)
  })

  it('should not render a `<UnderReviewLabel />` component', function () {
    expect(wrapper.find(UnderReviewLabel)).to.have.lengthOf(0)
  })

  describe('when the project is in beta', function () {
    before(function () {
      wrapper = shallow(<ProjectHeader inBeta title={TITLE} />)
    })

    it('should not render a `<UnderReviewLabel />` component', function () {
      expect(wrapper.find(UnderReviewLabel)).to.have.lengthOf(1)
    })
  })
})
