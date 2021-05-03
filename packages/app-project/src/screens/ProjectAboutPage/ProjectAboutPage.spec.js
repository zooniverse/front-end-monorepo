import { shallow } from 'enzyme'
import { ProjectAboutPage, PageHeading } from './ProjectAboutPage'
import AboutDropdownNav from './components/AboutDropdownNav'
import AboutSidebar from './components/AboutSidebar'
import TeamMember from './components/TeamMember'

let wrapper

describe('Component > ProjectAboutPage', () => {
  describe('About pages layout', () => {
    const aboutPageData = {
      title: 'Title',
      content: 'This is some content.'
    }

    before(() => {
      wrapper = shallow(
        <ProjectAboutPage
          aboutNavLinks={['research', 'team']}
          aboutPageData={aboutPageData}
        />
      )
    })

    it('should render without crashing', () => {
      expect(wrapper).to.be.ok()
    })

    it('should render the dropdown nav on mobile screen sizes', () => {
      wrapper.setProps({ screenSize: 'small' })
      expect(wrapper.find(AboutDropdownNav)).to.have.lengthOf(1)
    })

    it('should render the sidebar nav on desktop screen sizes', () => {
      wrapper.setProps({ screenSize: 'medium' })
      expect(wrapper.find(AboutSidebar)).to.have.lengthOf(1)
    })
  })

  describe('Team page specific components', () => {
    const aboutTeamPageData = {
      title: 'team',
      content: 'This is some content.'
    }

    before(() => {
      wrapper = shallow(
        <ProjectAboutPage
          aboutNavLinks={['research', 'team']}
          aboutPageData={aboutTeamPageData}
          teamArray={[
            { id: 0, display_name: 'name', role: 'scientist' },
            { id: 1, display_name: 'name', role: 'owner' }

          ]}
        />
      )
    })

    it('should display page heading The Team', () => {
      const heading = wrapper.find(PageHeading)
      expect(heading.text()).to.equal('The Team')
    })

    it('should render a list of Team Members', () => {
      const teamList = wrapper.find(TeamMember)
      expect(teamList).to.have.lengthOf(2)
    })
  })
})
