import { mount, shallow } from 'enzyme'
import sinon from 'sinon'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import Controls, { FlipButton } from './Controls'
import HighlightSeriesCheckBoxes from './components/HighlightSeriesCheckBoxes'
import PeriodMultipleControls from './components/PeriodMultipleControls'
import PhaseFocusControls from './components/PhaseFocusControls'
import variableStar from '../../../../helpers/mockLightCurves/variableStar'

const highlightedSeriesMock = [
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

  describe('highlighted series checkbox controls', function () {
    let wrapper
    before(function () {
      wrapper = mount(
        <Controls data={variableStar.data.scatterPlot.data} highlightedSeries={highlightedSeriesMock} setSeriesHighlight={sinon.spy()} />,
        {
          wrappingComponent: Grommet,
          wrappingComponentProps: { theme: zooTheme }
        }
      )
    })
    it('should render HighlightSeriesCheckBoxes', function () {
      expect(wrapper.find(HighlightSeriesCheckBoxes)).to.have.lengthOf(1)
    })

    it('should pass the data, highlightedSeries, and setSeriesHighlight props', function () {
      const highlightControls = wrapper.find(HighlightSeriesCheckBoxes)
      expect(highlightControls.props().data).to.deep.equal(wrapper.props().data)
      expect(highlightControls.props().highlightedSeries).to.deep.equal(wrapper.props().highlightedSeries)
      expect(highlightControls.props().setSeriesHighlight).to.deep.equal(wrapper.props().setSeriesHighlight)
    })
  })
})
