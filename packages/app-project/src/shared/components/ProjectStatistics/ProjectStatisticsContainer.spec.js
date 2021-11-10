import { shallow } from 'enzyme'

import ProjectStatistics from './ProjectStatistics'
import { ProjectStatisticsContainer } from './ProjectStatisticsContainer'

let wrapper
let projectStatisticsWrapper

const CLASSIFICATIONS = 1
const COMPLETED_SUBJECTS = 2
const ROUTER = {
  asPath: '/foo/bar',
  query: {
    owner: 'foo',
    project: 'bar'
  }
}
const SUBJECTS = 3
const VOLUNTEERS = 4

describe('Component > ProjectStatisticsContainer', function () {
  before(function () {
    wrapper = shallow(<ProjectStatisticsContainer
      classifications={CLASSIFICATIONS}
      completedSubjects={COMPLETED_SUBJECTS}
      router={ROUTER}
      subjects={SUBJECTS}
      volunteers={VOLUNTEERS}
    />)
    projectStatisticsWrapper = wrapper.find(ProjectStatistics)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `ProjectStatistics` component', function () {
    expect(projectStatisticsWrapper).to.have.lengthOf(1)
  })

  it('should pass through a `classifications` prop', function () {
    expect(projectStatisticsWrapper.prop('classifications')).to.equal(CLASSIFICATIONS)
  })

  it('should pass through a `completedSubjects` prop', function () {
    expect(projectStatisticsWrapper.prop('completedSubjects')).to.equal(COMPLETED_SUBJECTS)
  })

  it('should pass through a `linkProps` prop', function () {
    expect(projectStatisticsWrapper.prop('linkProps')).to.deep.equal({
      href: `/foo/bar/stats`
    })
  })

  it('should pass through a `subjects` prop', function () {
    expect(projectStatisticsWrapper.prop('subjects')).to.equal(SUBJECTS)
  })

  it('should pass through a `volunteers` prop', function () {
    expect(projectStatisticsWrapper.prop('volunteers')).to.equal(VOLUNTEERS)
  })
})
