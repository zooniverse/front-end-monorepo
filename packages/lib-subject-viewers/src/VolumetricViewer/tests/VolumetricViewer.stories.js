import VolumetricViewer from './../VolumetricViewer'
import asyncStates from '@zooniverse/async-states'
import {
  VolumetricSubjectMock4,
  VolumetricSubjectMock8,
  VolumetricSubjectMock16,
  VolumetricSubjectMock32,
  VolumetricSubjectMock64
} from './../data/subjectMock'

export default {
  title: 'Components / VolumetricViewer',
  component: VolumetricViewer
}

export const Volume4x4x4 = () => {
  return (
    <VolumetricViewer
      loadingState={asyncStates.success}
      subject={VolumetricSubjectMock4}
    />
  )
}

export const Volume8x8x8 = () => {
  return (
    <VolumetricViewer
      loadingState={asyncStates.success}
      subject={VolumetricSubjectMock8}
    />
  )
}

export const Volume16x16x16 = () => {
  return (
    <VolumetricViewer
      loadingState={asyncStates.success}
      subject={VolumetricSubjectMock16}
    />
  )
}

export const Volume32x32x32 = () => {
  return (
    <VolumetricViewer
      loadingState={asyncStates.success}
      subject={VolumetricSubjectMock32}
    />
  )
}

export const Volume64x64x64 = () => {
  return (
    <VolumetricViewer
      loadingState={asyncStates.success}
      subject={VolumetricSubjectMock64}
    />
  )
}
