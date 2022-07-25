import { shallow } from 'enzyme'
import * as Router from 'next/router'
import sinon from 'sinon'
import { ProjectHeaderContainer } from './ProjectHeaderContainer'
import ProjectHeader from './ProjectHeader'

describe('Component > ProjectHeaderContainer', function () {
  let wrapper
  let projectHeader
  let routerStub

  const PROJECT_DISPLAY_NAME = 'Foobar'
  const ROUTER = {
    query: {
      locale: 'en',
      owner: 'Foo',
      project: 'Bar'
    }
  }
  before(function () {
    routerStub = sinon.stub(Router, 'useRouter').callsFake(() => ROUTER)
    wrapper = shallow(
      <ProjectHeaderContainer projectName={PROJECT_DISPLAY_NAME} />
    )
    projectHeader = wrapper.find(ProjectHeader)
  })

  after(function () {
    routerStub.restore()
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `ProjectHeader` component', function () {
    expect(projectHeader).to.have.lengthOf(1)
  })

  it('should pass down the project title', function () {
    expect(projectHeader.prop('title')).to.equal(PROJECT_DISPLAY_NAME)
  })

  describe('when not logged in', function () {
    it('should pass down the default nav links', function () {
      const navLinks = projectHeader.prop('navLinks')
      expect(navLinks.length).to.be.above(0)
      expect(navLinks[0].href).to.equal('/Foo/Bar/about/research')
      expect(navLinks[navLinks.length - 1].href).to.equal(
        '/Foo/Bar/collections'
      )
    })
  })

  describe('when logged in', function () {
    it('should pass nav links including recents', function () {
      wrapper = shallow(
        <ProjectHeaderContainer isLoggedIn projectName={PROJECT_DISPLAY_NAME} />
      )
      const projectHeader = wrapper.find(ProjectHeader)

      const navLinks = projectHeader.prop('navLinks')
      expect(navLinks.length).to.be.above(0)
      expect(navLinks[navLinks.length - 1].href).to.equal('/Foo/Bar/recents')
    })
  })

  describe('with a default workflow', function () {
    it('should pass a workflow-specific classify link', function () {
      wrapper = shallow(
        <ProjectHeaderContainer
          defaultWorkflow='1234'
          isLoggedIn
          projectName={PROJECT_DISPLAY_NAME}
        />
      )
      const projectHeader = wrapper.find(ProjectHeader)

      const navLinks = projectHeader.prop('navLinks')
      expect(navLinks.length).to.be.above(0)
      expect(navLinks[1].href).to.equal('/Foo/Bar/classify/workflow/1234')
    })
  })
})
