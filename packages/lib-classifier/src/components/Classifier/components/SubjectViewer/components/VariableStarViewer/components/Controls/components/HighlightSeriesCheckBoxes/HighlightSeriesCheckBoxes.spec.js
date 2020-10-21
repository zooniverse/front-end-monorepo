import { mount, shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import { CheckBox } from  'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import { SpacedText } from '@zooniverse/react-components'
import { HighlightSeriesCheckBoxes } from './HighlightSeriesCheckBoxes'
import variableStar from '../../../../../../helpers/mockLightCurves/variableStar'
import getDataSeriesSymbol from '../../../../../../helpers/getDataSeriesSymbol'

const seriesOneLabel = variableStar.data.scatterPlot.data[0].seriesOptions.label
const seriesTwoLabel = variableStar.data.scatterPlot.data[1].seriesOptions.label
const { data } = variableStar.data.scatterPlot

const defaultStateHighlightedSeries = [
  { [seriesOneLabel]: true },
  { [seriesTwoLabel]: true }
]

const toggledStateHighlightedSeries = [
  { [seriesOneLabel]: true },
  { [seriesTwoLabel]: false }
]

describe('Component > HighlightSeriesCheckBoxes', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(
      <HighlightSeriesCheckBoxes
        data={data}
        highlightedSeries={defaultStateHighlightedSeries}
        theme={zooTheme}
      />
    )
    expect(wrapper).to.be.ok()
  })

  it('should render checkbox inputs for the number of objects in the highlighted series state', function () {
    const wrapper = shallow(
      <HighlightSeriesCheckBoxes
        data={data}
        highlightedSeries={defaultStateHighlightedSeries}
        theme={zooTheme}
      />
    )
    expect(wrapper.find(CheckBox)).to.have.lengthOf(defaultStateHighlightedSeries.length)
  })

  it('should render the checked state based on the highlighted state', function () {
    let inputs
    const wrapper = shallow(
      <HighlightSeriesCheckBoxes
        data={data}
        highlightedSeries={defaultStateHighlightedSeries}
        theme={zooTheme}
      />
    )

    inputs = wrapper.find(CheckBox)
    inputs.forEach((input, index) => {
      const [highlightedStateValue] = Object.values(defaultStateHighlightedSeries[index])
      expect(input.props().checked).to.equal(highlightedStateValue)
    })

    wrapper.setProps({ highlightedSeries: toggledStateHighlightedSeries })

    inputs = wrapper.find(CheckBox)
    inputs.forEach((input, index) => {
      const [highlightedStateValue] = Object.values(toggledStateHighlightedSeries[index])
      expect(input.props().checked).to.equal(highlightedStateValue)
    })
  })

  it('should render the labels state based on the highlighted state', function () {
    const wrapper = shallow(
      <HighlightSeriesCheckBoxes
        data={data}
        highlightedSeries={defaultStateHighlightedSeries}
        theme={zooTheme}
      />
    )
    const labels = wrapper.find(SpacedText)
    labels.forEach((label, index) => {
      const [highlightedStateLabel] = Object.keys(defaultStateHighlightedSeries[index])
      expect(label.html()).to.contain(highlightedStateLabel)
    })
  })

  it('should render different glyphs and colors in each checkbox', function () {
    const wrapper = mount(
      <HighlightSeriesCheckBoxes
        data={data}
        highlightedSeries={defaultStateHighlightedSeries}
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

  it('should call setSeriesHighlight for the onChange event', function () {
    const setSeriesHighlightSpy = sinon.spy()
    const wrapper = shallow(
      <HighlightSeriesCheckBoxes
        data={data}
        highlightedSeries={defaultStateHighlightedSeries}
        setSeriesHighlight={setSeriesHighlightSpy}
        theme={zooTheme}
      />
    )
    const inputs = wrapper.find(CheckBox)
    inputs.forEach((input) => {
      input.simulate('change', { target: {} })
      expect(setSeriesHighlightSpy).to.have.been.calledOnceWith({ target: {} })
      setSeriesHighlightSpy.resetHistory()
    })
  })
})