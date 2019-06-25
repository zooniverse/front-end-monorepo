import { render } from 'enzyme'
import React from 'react'

import Person from './Person'

const JOB_TITLE = 'Foo'
const NAME = 'Baz'

describe('Component > Person', function () {
  it('should render without crashing', function () {
    const wrapper = render(<Person />)
    expect(wrapper).to.be.ok()
  })

  it('should render the name and job title', function () {
    const wrapper = render(<Person jobTitle={JOB_TITLE} name={NAME} />)
    expect(wrapper.html()).to.include(`${NAME}, ${JOB_TITLE}`)
  })
})
