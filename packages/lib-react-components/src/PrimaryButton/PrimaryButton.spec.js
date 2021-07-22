import { expect } from 'chai'
import { shallow, render } from 'enzyme'
import { Grommet, Button } from 'grommet'
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
        <PrimaryButton label={LABEL} {...TEST_PROPS} />, {
        wrappingComponent: <Grommet />
      }
    )

    expect(wrapper.find(Button).props()).to.deep.include(TEST_PROPS)
  })

  describe('when href is defined and disabled is true', function () {
    it('should render as a span', function () {
      const wrapper = render(
        <Grommet>
          <PrimaryButton disabled href='www.google.com' label={LABEL} />
        </Grommet>
      )

      expect(wrapper.children()[0].name).to.equal('span')
    })
  })
})
