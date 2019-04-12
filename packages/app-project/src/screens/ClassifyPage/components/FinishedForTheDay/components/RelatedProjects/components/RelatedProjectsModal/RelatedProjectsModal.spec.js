import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import RelatedProjectsModal from './RelatedProjectsModal'
import ProjectCard from './components/ProjectCard'

let wrapper

const CLOSE_FN = sinon.stub()

const PROJECTS = [
  { name: 'foo' },
  { name: 'bar' },
  { name: 'baz' }
]

describe('Component > RelatedProjectsModal', function () {
  before(function () {
    wrapper = shallow(<RelatedProjectsModal
      closeFn={CLOSE_FN}
      projects={PROJECTS}
    />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should pass the a `title` prop to the modal', function () {
    expect(wrapper.prop('title')).to.be.ok()
  })

  it('should pass down a `closeFn` prop to the modal', function () {
    expect(wrapper.prop('closeFn')).to.equal(CLOSE_FN)
  })

  it('should render a `<ProjectCard />` for each project passed as a prop', function () {
    expect(wrapper.find(ProjectCard)).to.have.lengthOf(PROJECTS.length)
  })
})
