import { default as Component } from '../VolumetricPreview.js'
import {
  VolumetricSubjectMock4,
  VolumetricSubjectMock8,
  VolumetricSubjectMock16,
  VolumetricSubjectMock32,
  VolumetricSubjectMock64
} from './../data/subjectMock'

export default {
  title: 'Components / VolumetricViewer / Preview',
  component: Component
}

export const Volume4x4x4 = () => {
  return (
    <Component
      subject={VolumetricSubjectMock4}
    />
  )
}

export const Volume8x8x8 = () => {
  return (
    <Component
      subject={VolumetricSubjectMock8}
    />
  )
}

export const Volume16x16x16 = () => {
  return (
    <Component
      subject={VolumetricSubjectMock16}
    />
  )
}

export const Volume32x32x32 = () => {
  return (
    <Component
      subject={VolumetricSubjectMock32}
    />
  )
}

export const Volume64x64x64 = () => {
  return (
    <Component
      subject={VolumetricSubjectMock64}
    />
  )
}
