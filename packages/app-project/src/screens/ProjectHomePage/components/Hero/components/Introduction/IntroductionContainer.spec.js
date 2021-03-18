import { shallow } from 'enzyme'
import React from 'react'

import { IntroductionContainer } from './IntroductionContainer'
import Introduction from './Introduction'

const DESCRIPTION = 'Ligula vestibulum id natoque mus cursus sociis varius risus nunc'
const ROUTER = {
  asPath: '/projects/foo/bar',
  query: {
    owner: 'foo',
    project: 'bar'
  }
}
const TITLE = 'Cum semper tristique'

describe('Component > Hero > IntroductionContainer', function () {
  let wrapper
  let componentWrapper
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
      href: '/projects/foo/bar/about/research'
    })
    expect(componentWrapper.prop('title')).to.equal(TITLE)
  })

  describe('when the PANOPTES_ENV is production', function () {
    let previousEnv
    before(function () {
      previousEnv = process.env.PANOPTES_ENV
      process.env.PANOPTES_ENV = 'production'
      wrapper = shallow(<IntroductionContainer
        description={DESCRIPTION}
        router={ROUTER}
        title={TITLE}
      />)
      componentWrapper = wrapper.find(Introduction)
    })

    after(function () {
      process.env.PANOPTES_ENV = previousEnv
    })

    it('should pass the expect href prop', function () {
      expect(componentWrapper.prop('linkProps')).to.deep.equal({
        href: 'https://www.zooniverse.org/projects/foo/bar/about'
      })
    })
  })
})
