import { render } from 'enzyme'
import React from 'react'

import { Background } from './Background'

const BACKGROUND_SRC = '/foo/bar/baz.jpg'

describe('Component > Background', function () {
  let wrapper
  before(function () {
    wrapper = render(<Background backgroundSrc={BACKGROUND_SRC} />)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render an `img` with the correct src', function () {
    expect(wrapper[0].name).to.equal('img')
    expect(wrapper.attr('src')).to.equal(BACKGROUND_SRC)
  })
})
