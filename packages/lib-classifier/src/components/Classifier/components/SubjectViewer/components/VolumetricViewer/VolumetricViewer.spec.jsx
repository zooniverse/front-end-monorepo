import { render, screen } from '@testing-library/react'
import asyncStates from '@zooniverse/async-states'
import VolumetricViewerWrapper from './VolumetricViewerWrapper'

describe('Component > VolumetricViewer', function () {
  it('should render the Volumetric Viewer asynchronously', async function () {
    render(<VolumetricViewerWrapper
      subjectQueueState={asyncStates.success}
      subjectReadyState={asyncStates.success}
      subject={{
        id: 'mock-id',
        subjectJSON: 'mock-subject-json'
      }}
    />)
    expect(screen.getByText('Loading Volumetric Viewer...')).to.exist
    // expect(await screen.getByTestId('subject-viewer-volumetric')).to.exist
  })
})
