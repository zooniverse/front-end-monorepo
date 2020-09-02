import { mount, shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import Controls, { FlipButton } from './Controls'
import VisibilitySeriesCheckBoxes from './components/VisibilitySeriesCheckBoxes'
import PeriodMultipleControls from './components/PeriodMultipleControls'
import PhaseFocusControls from './components/PhaseFocusControls'
import variableStar from '../../../../helpers/mockLightCurves/variableStar'

const visibleSeriesMock = [
  { foo: true },
  { bar: true }
]

describe('VariableStarViewer > Component > Controls', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<Controls />)
    expect(wrapper).to.be.ok()
  })

  describe('y-axis inversion', function () {
    it('should call props.setYAxisInversion when the flip button is clicked', function () {
      const setYAxisInversionSpy = sinon.spy()
      const wrapper = mount(
        <Controls setYAxisInversion={setYAxisInversionSpy} />,
        {
          wrappingComponent: Grommet,
          wrappingComponentProps: { theme: zooTheme }
        }
      )
      wrapper.find(FlipButton).simulate('click')
      expect(setYAxisInversionSpy).to.have.been.calledOnce()
    })
  })
  
  describe('period multiple controls', function () {
    let wrapper
    before(function () {
      wrapper = mount(
        <Controls data={variableStar.data.scatterPlot.data} periodMultiple={2} setPeriodMultiple={sinon.spy()} />,
        {
          wrappingComponent: Grommet,
          wrappingComponentProps: { theme: zooTheme }
        }
      )
    })

    it('should render PeriodMultipleControls', function () {
      expect(wrapper.find(PeriodMultipleControls)).to.have.lengthOf(1)
    })

    it('should pass periodMultiple and setPeriodMultiple', function () {
      const periodMultipleControls = wrapper.find(PeriodMultipleControls)
      expect(periodMultipleControls.props().periodMultiple).to.equal(wrapper.props().periodMultiple)
      expect(periodMultipleControls.props().setPeriodMultiple).to.equal(wrapper.props().setPeriodMultiple)
    })
  })

  describe('phase focus controls', function () {
    let wrapper
    before(function () {
      wrapper = mount(
        <Controls data={variableStar.data.scatterPlot.data} phaseFocusedSeries={1} setSeriesPhaseFocus={sinon.spy()} />,
        {
          wrappingComponent: Grommet,
          wrappingComponentProps: { theme: zooTheme }
        }
      )
    })

    it('should render PhaseFocusControls', function () {
      expect(wrapper.find(PhaseFocusControls)).to.have.lengthOf(1)
    })

    it('should pass the data, phaseFocusedSeries, and setSeriesPhaseFocus', function () {
      const phaseFocusControls = wrapper.find(PhaseFocusControls)
      expect(phaseFocusControls.props().data).to.deep.equal(wrapper.props().data)
      expect(phaseFocusControls.props().phaseFocusedSeries).to.equal(wrapper.props().phaseFocusedSeries)
      expect(phaseFocusControls.props().setSeriesPhaseFocus).to.equal(wrapper.props().setSeriesPhaseFocus)
    })
  })

  describe('visible series checkbox controls', function () {
    let wrapper
    before(function () {
      wrapper = mount(
        <Controls data={variableStar.data.scatterPlot.data} visibleSeries={visibleSeriesMock} setSeriesVisibility={sinon.spy()} />,
        {
          wrappingComponent: Grommet,
          wrappingComponentProps: { theme: zooTheme }
        }
      )
    })
    it('should render VisibilitySeriesCheckBoxes', function () {
      expect(wrapper.find(VisibilitySeriesCheckBoxes)).to.have.lengthOf(1)
    })

    it('should pass the data, visibleSeries, and setSeriesVisibility props', function () {
      const visibilityControls = wrapper.find(VisibilitySeriesCheckBoxes)
      expect(visibilityControls.props().data).to.deep.equal(wrapper.props().data)
      expect(visibilityControls.props().visibleSeries).to.deep.equal(wrapper.props().visibleSeries)
      expect(visibilityControls.props().setSeriesVisibility).to.deep.equal(wrapper.props().setSeriesVisibility)
    })
  })
})
