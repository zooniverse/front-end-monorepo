import { shallow } from 'enzyme'

import { ProjectHeader } from './ProjectHeader'
import Avatar from './components/Avatar'
import ProjectTitle from './components/ProjectTitle'
import ApprovedIcon from './components/ApprovedIcon'
import UnderReviewLabel from './components/UnderReviewLabel'
import LanguageToggle from './components/LanguageToggle'

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

  it('should not render a `<LanguageToggle />` component', function () {
    expect(wrapper.find(LanguageToggle)).to.have.length(0)
  })

  describe('when the project is in beta', function () {
    before(function () {
      wrapper = shallow(<ProjectHeader inBeta title={TITLE} />)
    })

    it('should not render a `<UnderReviewLabel />` component', function () {
      expect(wrapper.find(UnderReviewLabel)).to.have.lengthOf(1)
    })
  })

  describe('when the project has available transations', function () {
    before(function () {
      wrapper = shallow(<ProjectHeader availableLanguages={['en', 'fr']} title={TITLE} />)
    })

    it('should render the `<LanguageToggle />` component', function () {
      expect(wrapper.find(LanguageToggle)).to.have.length(1)
    })
  })
})
