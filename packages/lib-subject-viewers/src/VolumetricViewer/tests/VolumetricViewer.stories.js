import VolumetricViewer from './../VolumetricViewer'
import asyncStates from '@zooniverse/async-states'
import { VolumetricSubjectMock } from './../data/subjectMock'

export default {
  title: 'Components / VolumetricViewer',
  component: VolumetricViewer
}

export const Default = () => {
  return (
    <VolumetricViewer
      loadingState={asyncStates.success}
      subject={VolumetricSubjectMock}
    />
  )
}
