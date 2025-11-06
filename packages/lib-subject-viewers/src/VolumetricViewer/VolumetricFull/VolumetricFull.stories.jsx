import { default as Component } from './VolumetricFull'
import asyncStates from '@zooniverse/async-states'
import {
  VolumetricSubjectMock4,
  VolumetricSubjectMock8,
  VolumetricSubjectMock16,
  VolumetricSubjectMock32,
  VolumetricSubjectMock64
} from '../data/subjectMock.js'

export default {
  title: 'Components / VolumetricViewer / Full',
  component: Component
}

export const Volume4x4x4 = () => {
  return (
    <Component
      loadingState={asyncStates.success}
      subject={VolumetricSubjectMock4}
    />
  )
}

export const Volume8x8x8 = () => {
  return (
    <Component
      loadingState={asyncStates.success}
      subject={VolumetricSubjectMock8}
    />
  )
}

export const Volume16x16x16 = () => {
  return (
    <Component
      loadingState={asyncStates.success}
      subject={VolumetricSubjectMock16}
    />
  )
}

export const Volume32x32x32 = () => {
  return (
    <Component
      loadingState={asyncStates.success}
      subject={VolumetricSubjectMock32}
    />
  )
}

export const Volume64x64x64 = () => {
  return (
    <Component
      loadingState={asyncStates.success}
      subject={VolumetricSubjectMock64}
    />
  )
}
