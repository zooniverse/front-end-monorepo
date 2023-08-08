import { mount } from 'enzyme'
import { Provider } from 'mobx-react'

import mockStore from '@test/mockStore'
import { Graph2dRangeFeedback } from './Graph2dRangeFeedback'
import LightCurveViewer from '../../SubjectViewer/components/LightCurveViewer'

describe('Component > Graph2dRangeFeedback', function () {
  const classifierStore = mockStore()

  it('should render without crashing', function () {
    const wrapper = mount(
      <Graph2dRangeFeedback subject={{ id: 1 }} />,
      {
        wrappingComponent: Provider,
        wrappingComponentProps: { classifierStore }
      }
    )
    expect(wrapper).to.be.ok()
  })

  it('should render the LightCurveViewer', function () {
    const wrapper = mount(
      <Graph2dRangeFeedback subject={{ id: 1 }} />,
      {
        wrappingComponent: Provider,
        wrappingComponentProps: { classifierStore }
      }
    )
    expect(wrapper.find(LightCurveViewer)).to.have.lengthOf(1)
  })
})
