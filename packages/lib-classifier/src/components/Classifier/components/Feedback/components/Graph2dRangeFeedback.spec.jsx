import { render, waitFor } from '@testing-library/react'
import { Provider } from 'mobx-react'
import { Factory } from 'rosie'

import mockStore from '@test/mockStore'
import Graph2dRangeFeedback from './Graph2dRangeFeedback'

describe('Component > Graph2dRangeFeedback', function () {
  const lightCurveSubject = Factory.build('subject', {
    locations: [
      { 'text/plain': 'https://panoptes-uploads.zooniverse.org/subject_location/a67ffd6c-36bc-4939-ad32-3706f606825b.txt'}
    ]
  })
  const classifierStore = mockStore({ subject: lightCurveSubject })

  it('should render the TESS LightCurveViewer', async function () {
    render(
      <Provider classifierStore={classifierStore}>
        <Graph2dRangeFeedback />
      </Provider>
    )
    await waitFor(() => expect(document.querySelector('.TESSLightCurve')).toBeDefined())
  })
})
