import { Box } from 'grommet'
import { Provider } from 'mobx-react'
import SubjectPreview from './'

import {
  PlainSubjectMock,
  TranscriptionSubjectMock,
  VideoSubjectMock,
  SubjectPreviewState,
  StoreMock
} from './SubjectPreview.mock'

export default {
  title: 'Project App / Shared / Subject Preview',
  component: SubjectPreview
}

export const Plain = ({ isLoggedIn, subject, slug }) => (
  <Provider store={StoreMock}>
    <Box height='medium' pad='medium' width='medium'>
      <SubjectPreview
        height='200px'
        isLoggedIn={isLoggedIn}
        subject={subject}
        slug={slug}
        width='270px'
      />
    </Box>
  </Provider>
)

Plain.args = { ...SubjectPreviewState, subject: PlainSubjectMock }

export const Transcription = ({ isLoggedIn, subject, slug }) => (
  <Provider store={StoreMock}>
    <Box height='medium' pad='medium' width='medium'>
      <SubjectPreview
        height='200px'
        isLoggedIn={isLoggedIn}
        subject={subject}
        slug={slug}
        width='270px'
      />
    </Box>
  </Provider>
)

Transcription.args = { ...SubjectPreviewState, subject: TranscriptionSubjectMock }

export const Video = ({ isLoggedIn, subject, slug }) => (
  <Provider store={StoreMock}>
    <Box height='medium' pad='medium' width='medium'>
      <SubjectPreview
        height='200px'
        isLoggedIn={isLoggedIn}
        subject={subject}
        slug={slug}
        width='270px'
      />
    </Box>
  </Provider>
)

Video.args = { ...SubjectPreviewState, subject: VideoSubjectMock }
