import { shallow } from 'enzyme'
import React from 'react'
import zooTheme from '@zooniverse/grommet-theme'
import { SpacedText } from '@zooniverse/react-components'
import Label from './Label'
import variableStar from '@viewers/helpers/mockLightCurves/variableStar'
import getDataSeriesSymbol from '@viewers/helpers/getDataSeriesSymbol'

const { colors } = zooTheme.global
const seriesOneOptions = variableStar.data.scatterPlot.data[0].seriesOptions
const seriesTwoOptions = variableStar.data.scatterPlot.data[1].seriesOptions

describe('Controls > Components > Label', function ()  {
  it('should render without crashing', function () {
    const wrapper = shallow(
      <Label
        colors={colors}
        label={seriesOneOptions.label}
        seriesIndex={0}
        seriesOptions={seriesOneOptions}
      />
    )
    expect(wrapper).to.be.ok()
  })

  it('should render a label', function () {
    const wrapper = shallow(
      <Label
        colors={colors}
        label={seriesOneOptions.label}
        seriesIndex={0}
        seriesOptions={seriesOneOptions}
      />
    )
    const label = wrapper.find(SpacedText)
    expect(label).to.have.lengthOf(1)
    expect(label.contains(seriesOneOptions.label)).to.be.true()
  })

  it('should render the correct glyph', function () {
    const wrapper = shallow(
      <Label
        colors={colors}
        label={seriesOneOptions.label}
        seriesIndex={0}
        seriesOptions={seriesOneOptions}
      />
    )
    const seriesOneGlyph = getDataSeriesSymbol(0)
    const seriesTwoGlyph = getDataSeriesSymbol(1)
    expect(wrapper.find(seriesOneGlyph)).to.have.lengthOf(1)
    expect(wrapper.find(seriesTwoGlyph)).to.have.lengthOf(0)
    wrapper.setProps({ seriesIndex: 1, seriesOptions: seriesTwoOptions })
    expect(wrapper.find(seriesOneGlyph)).to.have.lengthOf(0)
    expect(wrapper.find(seriesTwoGlyph)).to.have.lengthOf(1)
  })

  it('should render the glyph with a fill color', function () {
    const wrapper = shallow(
      <Label
        colors={colors}
        label={seriesOneOptions.label}
        seriesIndex={0}
        seriesOptions={seriesOneOptions}
      />
    )
    const seriesOneGlyph = getDataSeriesSymbol(0)
    expect(wrapper.find(seriesOneGlyph).props().fill).to.be.a('string')
  })
})