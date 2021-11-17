import { render } from 'enzyme'
import * as Router from 'next/router'
import sinon from 'sinon'

import Introduction from './Introduction'

const DESCRIPTION = 'Project Title!'
const LINK_PROPS = {
  href: '/projects/foo/bar/about/research'
}
const TITLE = 'baz'

describe('Component > Hero > Introduction', function () {
  let wrapper
  let routerStub

  const ROUTER = {
    asPath: '/projects/zooniverse/snapshot-serengeti/about',
    locale: 'en',
    push: () => {},
    prefetch: () => new Promise((resolve, reject) => {}),
    query: {
      owner: 'zooniverse',
      project: 'snapshot-serengeti'
    }
  }

  before(function () {
    routerStub = sinon.stub(Router, 'useRouter').callsFake(() => ROUTER)

    wrapper = render(<Introduction
      description={DESCRIPTION}
      linkProps={LINK_PROPS}
      title={TITLE}
    />)
  })

  after(function () {
    routerStub.restore()
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the title', function () {
    expect(wrapper.text().includes(TITLE)).to.be.true()
  })

  it('should render the description', function () {
    expect(wrapper.text().includes(DESCRIPTION)).to.be.true()
  })

  it('should render a link to the about page', function () {
    expect(wrapper.find(`a[href="${LINK_PROPS.href}"]`)).to.have.lengthOf(1)
  })
})
