import asyncStates from '@zooniverse/async-states'
import { VolumetricViewerWrapper } from './VolumetricViewerWrapper'
import { VolumetricSubjectMock } from './VolumetricMockSubject'

export default {
  title: 'Subject Viewers / VolumetricViewer',
  component: VolumetricViewerWrapper
}

export function Default() {
  return (
    <VolumetricViewerWrapper
      loadingState={asyncStates.success}
      subject={VolumetricSubjectMock}
    />
  )
}
