import SubjectCard from '../SubjectCard'
import {
  FROG_FIND_SUBJECT,
  StoryRow
} from './SubjectCardStoryData'

const meta = {
  title: 'Components / SubjectCard / Audio',
  component: SubjectCard
}

export default meta

export const FrogFind = {
  render: () => <StoryRow login={'TestUser'} subject={FROG_FIND_SUBJECT} />
}
