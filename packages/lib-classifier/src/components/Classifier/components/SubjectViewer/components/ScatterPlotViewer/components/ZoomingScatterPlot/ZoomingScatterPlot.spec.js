import { shallow } from 'enzyme'
import React from 'react'
import { ZoomingScatterPlot } from './ZoomingScatterPlot'
import {
  data,
  parentHeight,
  parentWidth
} from '../../helpers/mockData'

describe.only('Component > ZoomingScatterPlot', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(
      <ZoomingScatterPlot
        data={data}
        parentHeight={parentHeight}
        parentWidth={parentWidth}
      />
    )
    expect(wrapper).to.be.ok()
  })
})
     