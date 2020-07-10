import { mount, shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import Controls, { FlipButton, StyledRadioButtonGroup } from './Controls'
import VisibilitySeriesCheckBoxes from './components/VisibilitySeriesCheckBoxes'
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
        <Grommet theme={zooTheme}>
          <Controls setYAxisInversion={setYAxisInversionSpy} />
        </Grommet>
      )
      wrapper.find(FlipButton).simulate('click')
      expect(setYAxisInversionSpy).to.have.been.calledOnce()
    })
  })

  describe('visible series checkbox controls', function () {
    it('should render VisibilitySeriesCheckBoxes', function () {
      const wrapper = mount(
        <Grommet theme={zooTheme}>
          <Controls data={variableStar.data} visibleSeries={visibleSeriesMock} setSeriesVisibility={sinon.spy()} />
        </Grommet>
      )
      expect(wrapper.find(VisibilitySeriesCheckBoxes)).to.have.lengthOf(1)
    })

    it('should pass the data, visibleSeries, and setSeriesVisibility props', function () {
      const wrapper = mount(
        <Grommet theme={zooTheme}>
          <Controls data={variableStar.scatterPlot.data} visibleSeries={visibleSeriesMock} setSeriesVisibility={sinon.spy()} />
        </Grommet>
      )
      const controls = wrapper.find(Controls)
      const visibilityControls = wrapper.find(VisibilitySeriesCheckBoxes)
      expect(visibilityControls.props().data).to.deep.equal(controls.props().data)
      expect(visibilityControls.props().visibleSeries).to.deep.equal(controls.props().visibleSeries)
      expect(visibilityControls.props().setSeriesVisibility).to.deep.equal(controls.props().setSeriesVisibility)
    })
  })

  describe('Period Multiple Controls', function () {
    it('should render four multiple options', function () {
      const wrapper = mount(
        <Grommet theme={zooTheme}>
          <Controls />
        </Grommet>
      )

      const radioInputs = wrapper.find('input[type="radio"]')
      expect(radioInputs).to.have.lengthOf(4)
    })

    it('should set the checked state radio button inputs using the periodMultiple prop', function () {
      const periodMultiple = 2
      const wrapper = mount(
        <Grommet theme={zooTheme}>
          <Controls periodMultiple={periodMultiple} />
        </Grommet>
      )
      const checkedRadioInput = wrapper.find('input[type="radio"]').find({ value: periodMultiple.toString() })
      expect(checkedRadioInput.props().checked).to.be.true()
    })

    it('should call setPeriodMultiple for the onChange event', function () {
      const setPeriodMultipleSpy = sinon.spy()
      const wrapper = mount(
        <Grommet theme={zooTheme}>
          <Controls setPeriodMultiple={setPeriodMultipleSpy} />
        </Grommet>
      )
      const radioInputs = wrapper.find('input[type="radio"]') 
      radioInputs.forEach((input) => {
        input.simulate('change')
        expect(setPeriodMultipleSpy).to.have.been.calledOnce()
        setPeriodMultipleSpy.resetHistory()
      })
    })
  })
})
