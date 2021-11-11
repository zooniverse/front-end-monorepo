import { shallow } from 'enzyme'

import { IntroductionContainer } from './IntroductionContainer'
import Introduction from './Introduction'

let wrapper
let componentWrapper

const DESCRIPTION = 'Ligula vestibulum id natoque mus cursus sociis varius risus nunc'
const ROUTER = {
  asPath: '/foo/bar',
  query: {
    owner: 'foo',
    project: 'bar'
  }
}
const TITLE = 'Cum semper tristique'

describe('Component > Hero > IntroductionContainer', function () {
  before(function () {
    wrapper = shallow(<IntroductionContainer
      description={DESCRIPTION}
      router={ROUTER}
      title={TITLE}
    />)
    componentWrapper = wrapper.find(Introduction)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the `Introduction` component', function () {
    expect(componentWrapper).to.have.lengthOf(1)
  })

  it('should pass down the expected props to the `Introduction` component', function () {
    expect(componentWrapper.prop('description')).to.equal(DESCRIPTION)
    expect(componentWrapper.prop('linkProps')).to.deep.equal({
      href: '/foo/bar/about/research'
    })
    expect(componentWrapper.prop('title')).to.equal(TITLE)
  })
})
