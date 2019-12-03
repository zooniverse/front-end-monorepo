import { shallow, render } from 'enzyme'
import { Grommet } from 'grommet'
import React from 'react'

import PrimaryButton from './PrimaryButton'

const LABEL = 'Foobar'

describe('Component > PrimaryButton', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<PrimaryButton label={LABEL} />)
    expect(wrapper).to.be.ok()
  })

  it('should render the label', function () {
    const wrapper = render(
      <Grommet>
        <PrimaryButton label={LABEL} />
      </Grommet>
    )
    expect(wrapper.text()).to.equal(LABEL)
  })

  it('should pass down extra props', function () {
    const wrapper = render(
      <Grommet>
        <PrimaryButton label={LABEL} disabled />
      </Grommet>
    )
    const buttonAttributes = wrapper.find('button').get(0).attribs
    expect(Object.keys(buttonAttributes)).to.contain('disabled')
  })
})
