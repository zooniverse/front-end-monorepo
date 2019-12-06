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

  it('should pass down extra props to `Button`', function () {
    const TEST_PROPS = {
      disabled: true
    }

    const wrapper = shallow(
      <Grommet>
        <PrimaryButton label={LABEL} {...TEST_PROPS} />
      </Grommet>
    )

    const primaryButton = wrapper.find(PrimaryButton).dive()
    const grommetButton = primaryButton.dive().dive().dive()
    expect(grommetButton.props()).to.deep.include(TEST_PROPS)
  })
})
