import { render, screen } from '@testing-library/react'
import { expect } from 'chai'
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
    expect(screen.getByText('Suspense boundary')).to.exist()
    expect(await screen.findByTestId('subject-viewer-volumetric')).to.exist()
  })
})
