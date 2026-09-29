import SubjectCard from '../../../SubjectCard'
import {
  InteractiveStory,
  UNSUPPORTED_MIME_TYPE_SUBJECT
} from '../../SubjectCardStoryData'

const meta = {
  title: 'Components / SubjectCard / Interactive / SingleMedia / Unsupported',
  component: SubjectCard
}

export default meta

export const UnsupportedMimeType = {
  render: () => <InteractiveStory subject={UNSUPPORTED_MIME_TYPE_SUBJECT} />
}
