import React from 'react'
import { mount, shallow } from 'enzyme'
import sinon from 'sinon'
import { SpacedText } from '@zooniverse/react-components'
import zooTheme from '@zooniverse/grommet-theme'
import { Tooltip } from '@vx/tooltip'
import Triangle from '../../../../shared/Triangle'
import { VXTooltip } from './VXTooltip'

const label = '25'
const left = 50
const top = 50

describe('VXTooltip', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(
      <VXTooltip
        label={label}
        left={left}
        theme={zooTheme}
        top={top}
      />
    )

    expect(wrapper).to.be.ok()
  })

  it('should render a vx Tooltip component', function () {
    const wrapper = shallow(
      <VXTooltip
        label={label}
        left={left}
        theme={zooTheme}
        top={top}
      />
    )

    expect(wrapper.find(Tooltip)).to.have.lengthOf(1)
  })

  it('should position the tooltip above the target', function () {
    const wrapper = shallow(
      <VXTooltip
        label={label}
        left={left}
        theme={zooTheme}
        top={top}
      />
    )

    const vxTooltip = wrapper.find(Tooltip)
    expect(vxTooltip.props().top).to.be.below(top)
    expect(vxTooltip.props().left).to.equal(left)
  })

  it('should fallback to the initial top props position if the tooltip is out of bounds', function () {
    const wrapper = shallow(
      <VXTooltip
        label={label}
        left={left}
        parentRect={{
          bottom: 377,
          height: 354,
          left: 23,
          right: 704,
          top: 23,
          width: 681,
          x: 23,
          y: 23
        }}
        rect={{
          bottom: 18,
          height: 44,
          left: 137.5,
          right: 254.625,
          top: -26,
          width: 117.125,
          x: 137.5,
          y: -26
        }}
        theme={zooTheme}
        top={top}
      />
    )

    const vxTooltip = wrapper.find(Tooltip)
    expect(vxTooltip.props().top).to.equal(top)
  })
})