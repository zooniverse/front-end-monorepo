import { render } from 'enzyme'
import * as Router from 'next/router'
import sinon from 'sinon'
import ProjectTitle from './ProjectTitle'

describe('Component > ProjectTitle', function () {
  let wrapper, routerStub

  const ROUTER_ON_HOME_PAGE = {
    asPath: '/foo/bar',
    pathname: '/[owner]/[project]',
    query: {
      owner: 'foo',
      project: 'bar'
    }
  }

  const ROUTER_ON_OTHER_PAGE = {
    asPath: '/foo/bar/baz',
    pathname: '/[owner]/[project]/baz',
    query: {
      owner: 'foo',
      project: 'bar'
    }
  }

  const TITLE = 'Project title'

  before(function () {
    routerStub = sinon.stub(Router, 'useRouter').callsFake(() => ROUTER_ON_HOME_PAGE)
    wrapper = render(<ProjectTitle title={TITLE} />)
  })

  after(function () {
    routerStub.restore()
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the title prop as an h1', function () {
    const title = wrapper.find('h1')
    expect(title).to.have.lengthOf(1)
    expect(title.text()).to.equal(TITLE)
  })

  describe('when on the home page', function () {
    it('should be wrapped in an anchor with no `href`', function () {
      expect(wrapper[0].name).to.equal('a')
      expect(wrapper.href).to.equal(undefined)
    })
  })

  describe('when not on the homepage', function () {
    it('should be wrapped in an anchor with an `href`', function () {
      routerStub.callsFake(() => ROUTER_ON_OTHER_PAGE)
      wrapper = render(<ProjectTitle title={TITLE} />)
      expect(wrapper[0].name).to.equal('a')
      expect(wrapper.attr('href')).to.equal('/foo/bar')
    })
  })
})
