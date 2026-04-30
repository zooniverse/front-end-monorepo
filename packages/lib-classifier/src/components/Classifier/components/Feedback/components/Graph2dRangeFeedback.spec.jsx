import { render, waitFor } from '@testing-library/react'
import { Provider } from 'mobx-react'
import { Factory } from 'rosie'
import { vi } from 'vitest'

import mockStore from '@test/mockStore'
import { tessLightCurve } from '@test/fixtures/jsonSubjectData'
import Graph2dRangeFeedback from './Graph2dRangeFeedback'

vi.mock('@hooks', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, useSubjectJSON: vi.fn() }
})

import { useSubjectJSON } from '@hooks'

describe('Component > Graph2dRangeFeedback', function () {
  const lightCurveSubject = Factory.build('subject', {
    locations: [{ 'text/plain': 'fixture.txt' }]
  })
  const classifierStore = mockStore({ subject: lightCurveSubject })

  before(function () {
    useSubjectJSON.mockReturnValue({
      loading: false,
      data: tessLightCurve,
      error: null,
      type: { name: 'TESSLightCurve' },
      viewer: { current: null }
    })
  })

  it('should render the TESS LightCurveViewer', async function () {
    render(
      <Provider classifierStore={classifierStore}>
        <Graph2dRangeFeedback />
      </Provider>
    )
    await waitFor(() => expect(document.querySelector('.TESSLightCurve')).to.exist)
  })
})
