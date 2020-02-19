import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import zooTheme from '@zooniverse/grommet-theme'
import { SpacedText } from '@zooniverse/react-components'
import { FocusSeriesCheckBoxes, StyledLabel } from './FocusSeriesCheckBoxes'
import variableStar from '../../../../../../helpers/mockLightCurves/variableStar'

const seriesOneLabel = variableStar.data[0].seriesOptions.label
const seriesTwoLabel = variableStar.data[1].seriesOptions.label
const { data } = variableStar

const defaultStateFocusedSeries = [
  { [seriesOneLabel]: true },
  { [seriesTwoLabel]: true }
]

const toggledStateFocusedSeries = [
  { [seriesOneLabel]: true },
  { [seriesTwoLabel]: false }
]

describe('Component > FocusSeriesCheckBoxes', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(
      <FocusSeriesCheckBoxes
        data={data}
        focusedSeries={defaultStateFocusedSeries}
        theme={zooTheme}
      />
    )
    expect(wrapper).to.be.ok()
  })

  it('should render checkbox inputs for the number of objects in the focused series state', function () {
    const wrapper = shallow(
      <FocusSeriesCheckBoxes
        data={data}
        focusedSeries={defaultStateFocusedSeries}
        theme={zooTheme}
      />
    )
    expect(wrapper.find("input[type='checkbox']")).to.have.lengthOf(defaultStateFocusedSeries.length)
  })

  it('should render the checked state based on the focused state', function () {
    let inputs
    const wrapper = shallow(
      <FocusSeriesCheckBoxes
        data={data}
        focusedSeries={defaultStateFocusedSeries}
        theme={zooTheme}
      />
    )

    inputs = wrapper.find("input[type='checkbox']")
    inputs.forEach((input, index) => {
      const [focusedStateValue] = Object.values(defaultStateFocusedSeries[index])
      expect(input.props().checked).to.equal(focusedStateValue)
    })

    wrapper.setProps({ focusedSeries: toggledStateFocusedSeries })

    inputs = wrapper.find("input[type='checkbox']")
    inputs.forEach((input, index) => {
      const [focusedStateValue] = Object.values(toggledStateFocusedSeries[index])
      expect(input.props().checked).to.equal(focusedStateValue)
    })
  })

  it('should render the labels state based on the focused state', function () {
    const wrapper = shallow(
      <FocusSeriesCheckBoxes
        data={data}
        focusedSeries={defaultStateFocusedSeries}
        theme={zooTheme}
      />
    )
    const labels = wrapper.find(SpacedText)
    labels.forEach((label, index) => {
      const [focusedStateLabel] = Object.keys(defaultStateFocusedSeries[index])
      expect(label.html()).to.contain(focusedStateLabel)
    })
  })

  it('should call setSeriesFocus for the onChange event', function () {
    const setSeriesFocusSpy = sinon.spy()
    const wrapper = shallow(
      <FocusSeriesCheckBoxes
        data={data}
        focusedSeries={defaultStateFocusedSeries}
        setSeriesFocus={setSeriesFocusSpy}
        theme={zooTheme}
      />
    )
    const inputs = wrapper.find("input[type='checkbox']")
    inputs.forEach((input) => {
      input.simulate('change', { target: {} })
      expect(setSeriesFocusSpy).to.have.been.calledOnceWith({ target: {} })
      setSeriesFocusSpy.resetHistory()
    })
  })
})