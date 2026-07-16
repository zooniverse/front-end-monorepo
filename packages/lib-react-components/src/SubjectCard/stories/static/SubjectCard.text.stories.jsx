import SubjectCard from '../../SubjectCard'
import {
  NOTES_FROM_NATURE_TEXT_SUBJECT,
  StoryRow
} from '../SubjectCardStoryData'

const meta = {
  title: 'Components / SubjectCard / Static / Text',
  component: SubjectCard
}

export default meta

export const NotesFromNature = {
  render: () => <StoryRow login={'TestUser'} subject={NOTES_FROM_NATURE_TEXT_SUBJECT} />
}
