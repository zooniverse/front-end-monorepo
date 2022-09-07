import { shallow } from 'enzyme'
import { ProjectHeaderContainer } from './ProjectHeaderContainer'
import ProjectHeader from './ProjectHeader'

describe('Component > ProjectHeaderContainer', function () {
  let wrapper
  let projectHeader

  const PROJECT_DISPLAY_NAME = 'Foobar'
  before(function () {
    const mockStore = {
      project: {
        configuration: {
          languages: ['en']
        },
        display_name: PROJECT_DISPLAY_NAME,
        slug: 'Foo/Bar'
      },
      user: {
        isLoggedIn: false
      }
    }
    wrapper = shallow(
      <ProjectHeaderContainer mockStore={mockStore} />
    )
    projectHeader = wrapper.find(ProjectHeader)
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
      const mockStore = {
        project: {
          configuration: {
            languages: ['en']
          },
          display_name: PROJECT_DISPLAY_NAME,
          slug: 'Foo/Bar'
        },
        user: {
          isLoggedIn: true
        }
      }
      wrapper = shallow(
        <ProjectHeaderContainer mockStore={mockStore} />
      )
      const projectHeader = wrapper.find(ProjectHeader)

      const navLinks = projectHeader.prop('navLinks')
      expect(navLinks.length).to.be.above(0)
      expect(navLinks[navLinks.length - 1].href).to.equal('/Foo/Bar/recents')
    })
  })

  describe('with a default workflow', function () {
    it('should pass a workflow-specific classify link', function () {
      const mockStore = {
        project: {
          configuration: {
            languages: ['en']
          },
          defaultWorkflow: '1234',
          display_name: PROJECT_DISPLAY_NAME,
          slug: 'Foo/Bar'
        },
        user: {
          isLoggedIn: true
        }
      }
      wrapper = shallow(
        <ProjectHeaderContainer
          mockStore={mockStore}
        />
      )
      const projectHeader = wrapper.find(ProjectHeader)

      const navLinks = projectHeader.prop('navLinks')
      expect(navLinks.length).to.be.above(0)
      expect(navLinks[1].href).to.equal('/Foo/Bar/classify/workflow/1234')
    })
  })
})
