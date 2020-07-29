import { shallow } from 'enzyme'
import React from 'react'
import { DataImageViewer } from './DataImageViewer'
import { ScatterPlotViewer } from '../ScatterPlotViewer'
import { SingleImageViewer } from '../SingleImageViewer'
import kepler from '../../helpers/mockLightCurves/kepler'

describe('Component > DataImageViewer', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<DataImageViewer />)
    expect(wrapper).to.be.ok()
  })

  describe('ScatterPlotViewer', function () {
    let wrapper
    before(function () {
      const JSONData = {
        data: kepler,
        chartOptions: {
          xAxisLabel: 'time',
          yAxisLabel: 'brightness'
        }
      }
      wrapper = shallow(<DataImageViewer JSONData={JSONData} />)
    })

    it('should render a ScatterPlotViewer', function () {
      expect(wrapper.find(ScatterPlotViewer)).to.have.lengthOf(1)
    })

    it('should pass along the data and chart options props', function () {
      const props = wrapper.find(ScatterPlotViewer).props()
      expect(props.data).to.deep.equal(kepler)
      expect(props.xAxisLabel).to.equal('time')
      expect(props.yAxisLabel).to.equal('brightness')
    })
  })

  describe('SingleImageViewer', function () {
    let wrapper
    const imageSrc = 'http://www.myimagehost.com/subject.png'

    before(function () {
      wrapper = shallow(<DataImageViewer imageSrc={imageSrc} />)
    })

    it('should render a SingleImageViewer', function () {
      expect(wrapper.find(SingleImageViewer)).to.have.lengthOf(1)
    })

    it('should render an svg image with the imageSrc', function () {
      const image = wrapper.find('image')
      expect(image).to.have.lengthOf(1)
      expect(image.props().xlinkHref).to.equal(imageSrc)
    })
  })
})