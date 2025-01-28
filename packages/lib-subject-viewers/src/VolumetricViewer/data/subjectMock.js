import size4 from './4x4x4.json'
import size8 from './8x8x8.json'
import size16 from './16x16x16.json'
import size32 from './32x32x32.json'
import size64 from './64x64x64.json'

const VolumetricSubjectMock = {
  id: 'mock_subject',
  locations: [
    {
      'application/json': 'https://panoptes-uploads.zooniverse.org/subject_location/34898ede-7e3d-4f83-b6ee-920769f01288.json'
    }
  ]
}

export const VolumetricSubjectMock4 = {
  ...VolumetricSubjectMock,
  subjectJSON: size4
}

export const VolumetricSubjectMock8 = {
  ...VolumetricSubjectMock,
  subjectJSON: size8
}

export const VolumetricSubjectMock16 = {
  ...VolumetricSubjectMock,
  subjectJSON: size16
}

export const VolumetricSubjectMock32 = {
  ...VolumetricSubjectMock,
  subjectJSON: size32
}

export const VolumetricSubjectMock64 = {
  ...VolumetricSubjectMock,
  subjectJSON: size64
}
