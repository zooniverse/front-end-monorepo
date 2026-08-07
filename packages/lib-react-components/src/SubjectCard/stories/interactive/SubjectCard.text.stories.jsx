import SubjectCard from '../../SubjectCard'
import {
  NOTES_FROM_NATURE_TEXT_SUBJECT,
  InteractiveStory
} from '../SubjectCardStoryData'

const meta = {
  title: 'Components / SubjectCard / Interactive / Text',
  component: SubjectCard
}

export default meta

export const NotesFromNature = {
  render: () => <InteractiveStory login={'TestUser'} subject={NOTES_FROM_NATURE_TEXT_SUBJECT} />
}
