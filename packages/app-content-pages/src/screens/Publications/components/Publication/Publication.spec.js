import { render } from 'enzyme'
import React from 'react'

import Publication from './Publication'

const AUTHORS = 'Foo'
const TITLE = 'Baz'
const URL = 'Qux'
const YEAR = '2019'

describe('Component > Publication', function () {
  it('should render without crashing', function () {
    const wrapper = render(<Publication />)
    expect(wrapper).to.be.ok()
  })

  describe('citation', function () {
    it('should render the title', function () {
      const wrapper = render(<Publication title={TITLE} />)
      expect(wrapper.html()).to.include(TITLE)
    })

    it('should render the title and authors if present', function () {
      const wrapper = render(<Publication authors={AUTHORS} title={TITLE} />)
      expect(wrapper.html()).to.include(`${TITLE}, ${AUTHORS}`)
    })

    it('should render the title and year if present', function () {
      const wrapper = render(<Publication title={TITLE} year={YEAR} />)
      expect(wrapper.html()).to.include(`${TITLE}, ${YEAR}`)
    })

    it('should render the title, author and year if present', function () {
      const wrapper = render(<Publication authors={AUTHORS} title={TITLE} year={YEAR} />)
      expect(wrapper.html()).to.include(`${TITLE}, ${AUTHORS}, ${YEAR}`)
    })
  })

  it('should render a link to the publication', function () {
    const wrapper = render(<Publication url={URL} />)
    expect(wrapper.find(`a[href="${URL}"]`)).to.have.lengthOf(1)
  })
})
