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
      owner: 'Foo',
      project: 'Bar'
    }
  }
  before(function () {
    routerStub = sinon.stub(Router, 'useRouter').callsFake(() => ROUTER)
    wrapper = shallow(<ProjectHeaderContainer
      projectName={PROJECT_DISPLAY_NAME}
    />)
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

  it('should pass down the nav links', function () {
    expect(projectHeader.prop('navLinks').length).to.be.above(0)
  })
})
