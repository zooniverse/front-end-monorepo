import { mount, shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import { CheckBox } from  'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import { SpacedText } from '@zooniverse/react-components'
import { VisibilitySeriesCheckBoxes } from './VisibilitySeriesCheckBoxes'
import variableStar from '../../../../../../helpers/mockLightCurves/variableStar'
import getDataSeriesSymbol from '../../../../../../helpers/getDataSeriesSymbol'

const seriesOneLabel = variableStar.data.scatterPlot.data[0].seriesOptions.label
const seriesTwoLabel = variableStar.data.scatterPlot.data[1].seriesOptions.label
const { data } = variableStar.data.scatterPlot

const defaultStateVisibleSeries = [
  { [seriesOneLabel]: true },
  { [seriesTwoLabel]: true }
]

const toggledStateVisibleSeries = [
  { [seriesOneLabel]: true },
  { [seriesTwoLabel]: false }
]

describe('Component > VisibilitySeriesCheckBoxes', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(
      <VisibilitySeriesCheckBoxes
        data={data}
        visibleSeries={defaultStateVisibleSeries}
        theme={zooTheme}
      />
    )
    expect(wrapper).to.be.ok()
  })

  it('should render checkbox inputs for the number of objects in the visible series state', function () {
    const wrapper = shallow(
      <VisibilitySeriesCheckBoxes
        data={data}
        visibleSeries={defaultStateVisibleSeries}
        theme={zooTheme}
      />
    )
    expect(wrapper.find(CheckBox)).to.have.lengthOf(defaultStateVisibleSeries.length)
  })

  it('should render the checked state based on the visible state', function () {
    let inputs
    const wrapper = shallow(
      <VisibilitySeriesCheckBoxes
        data={data}
        visibleSeries={defaultStateVisibleSeries}
        theme={zooTheme}
      />
    )

    inputs = wrapper.find(CheckBox)
    inputs.forEach((input, index) => {
      const [visibleStateValue] = Object.values(defaultStateVisibleSeries[index])
      expect(input.props().checked).to.equal(visibleStateValue)
    })

    wrapper.setProps({ visibleSeries: toggledStateVisibleSeries })

    inputs = wrapper.find(CheckBox)
    inputs.forEach((input, index) => {
      const [visibleStateValue] = Object.values(toggledStateVisibleSeries[index])
      expect(input.props().checked).to.equal(visibleStateValue)
    })
  })

  it('should render the labels state based on the visible state', function () {
    const wrapper = shallow(
      <VisibilitySeriesCheckBoxes
        data={data}
        visibleSeries={defaultStateVisibleSeries}
        theme={zooTheme}
      />
    )
    const labels = wrapper.find(SpacedText)
    labels.forEach((label, index) => {
      const [visibleStateLabel] = Object.keys(defaultStateVisibleSeries[index])
      expect(label.html()).to.contain(visibleStateLabel)
    })
  })

  it('should render different glyphs and colors in each checkbox', function () {
    const wrapper = mount(
      <VisibilitySeriesCheckBoxes
        data={data}
        visibleSeries={defaultStateVisibleSeries}
        theme={zooTheme}
      />
    )

    const seriesOneGlyph = getDataSeriesSymbol(0)
    const seriesTwoGlyph = getDataSeriesSymbol(1)
    const firstGlyph = wrapper.find(seriesOneGlyph)
    const secondGlyph = wrapper.find(seriesTwoGlyph)
    expect(firstGlyph).to.have.lengthOf(1)
    expect(secondGlyph).to.have.lengthOf(1)
    expect(firstGlyph).to.not.equal(secondGlyph)
    expect(firstGlyph.props().fill).to.not.be.empty()
    expect(secondGlyph.props().fill).to.not.be.empty()
    expect(firstGlyph.props().fill).to.not.equal(secondGlyph.props().fill)
  })

  it('should call setSeriesVisibility for the onChange event', function () {
    const setSeriesVisibilitySpy = sinon.spy()
    const wrapper = shallow(
      <VisibilitySeriesCheckBoxes
        data={data}
        visibleSeries={defaultStateVisibleSeries}
        setSeriesVisibility={setSeriesVisibilitySpy}
        theme={zooTheme}
      />
    )
    const inputs = wrapper.find(CheckBox)
    inputs.forEach((input) => {
      input.simulate('change', { target: {} })
      expect(setSeriesVisibilitySpy).to.have.been.calledOnceWith({ target: {} })
      setSeriesVisibilitySpy.resetHistory()
    })
  })
})