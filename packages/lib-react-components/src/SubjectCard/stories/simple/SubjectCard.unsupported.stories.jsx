import SubjectCard from '../../SubjectCard'
import {
  StoryRow,
  UNSUPPORTED_MIME_TYPE_SUBJECT
} from '../SubjectCardStoryData'

const meta = {
  title: 'Components / SubjectCard / Simple / Unsupported',
  component: SubjectCard
}

export default meta

export const UnsupportedMimeType = {
  render: () => <StoryRow login={'TestUser'} subject={UNSUPPORTED_MIME_TYPE_SUBJECT} />
}
