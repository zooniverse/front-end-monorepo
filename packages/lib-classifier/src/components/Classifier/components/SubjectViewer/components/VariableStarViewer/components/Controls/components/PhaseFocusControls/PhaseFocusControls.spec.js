import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import { RadioButton } from 'grommet'
import { PhaseFocusControls } from './PhaseFocusControls'
import variableStar from '@viewers/helpers/mockLightCurves/variableStar'
import zooTheme from '@zooniverse/grommet-theme'
import Label from '../Label'

describe('Controls > Components > PhaseFocusControls', function () {
  let wrapper, setSeriesPhaseFocusSpy
  const { data } = variableStar.data.scatterPlot
  const highlightedSeries = [
    data[0].seriesOptions.label,
    data[1].seriesOptions.label
  ]
  before(function () {
    setSeriesPhaseFocusSpy = sinon.spy()
    wrapper = shallow(
      <PhaseFocusControls
        data={data}
        highlightedSeries={highlightedSeries}
        phaseFocusedSeries={0}
        setSeriesPhaseFocus={setSeriesPhaseFocusSpy}
        theme={zooTheme}
      />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render a RadioButton for each series', function () {
    expect(wrapper.find(RadioButton)).to.have.lengthOf(data.length)
  })

  it('should check the radio button for the series index that equals the phaseFocusedSeries prop', function () {
    let radioButtons = wrapper.find(RadioButton)
    expect(radioButtons.at(0).props().checked).to.be.true()
    expect(radioButtons.at(1).props().checked).to.be.false()
    wrapper.setProps({ phaseFocusedSeries: 1 })
    radioButtons = wrapper.find(RadioButton)
    expect(radioButtons.at(0).props().checked).to.be.false()
    expect(radioButtons.at(1).props().checked).to.be.true()
  })

  it('should call setSeriesPhaseFocus on change', function () {
    const radioButtons = wrapper.find(RadioButton)
    radioButtons.forEach((input) => {
      input.simulate('change', { target: {} })
      expect(setSeriesPhaseFocusSpy).to.have.been.calledOnceWith({ target: {} })
      setSeriesPhaseFocusSpy.resetHistory()
    })
  })

  it('should set the value of the inputs to the string of the series index', function () {
    const radioButtons = wrapper.find(RadioButton)
    expect(radioButtons.at(0).props().value).to.equal('0')
    expect(radioButtons.at(1).props().value).to.equal('1')
  })

  it('should have a label for each radio button input', function () {
    data.forEach((series, seriesIndex) => {
      const radioButton = wrapper.find(RadioButton).at(seriesIndex)
      const label = series.seriesOptions.label
      expect(radioButton.props().label).to.deep.equal(
        <Label
          colors={zooTheme.global.colors}
          highlightedSeries={highlightedSeries}
          seriesIndex={seriesIndex}
          seriesOptions={series.seriesOptions}
          label={label}
          visible
        />
      )
    })
  })

  it('should use the fallback label if series option label is missing', function () {
    const dataWithoutLabel = data.map((series) => {
      const seriesWithoutLabel = Object.assign({}, series, { seriesOptions: {} })
      return seriesWithoutLabel
    })
    wrapper.setProps({ data: dataWithoutLabel })
    dataWithoutLabel.forEach((series, seriesIndex) => {
      const radioButton = wrapper.find(RadioButton).at(seriesIndex)
      const label = 'SubjectViewer.VariableStarViewer.label' // Translation function simply returns the key in a testing env

      expect(radioButton.props().label).to.deep.equal(
        <Label
          colors={zooTheme.global.colors}
          highlightedSeries={highlightedSeries}
          seriesIndex={seriesIndex}
          seriesOptions={series.seriesOptions}
          label={label}
          visible
        />
      )
    })
  })
})
