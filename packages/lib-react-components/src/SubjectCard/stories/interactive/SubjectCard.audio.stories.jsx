import SubjectCard from '../../SubjectCard'
import {
  FROG_FIND_SUBJECT,
  InteractiveStory
} from '../SubjectCardStoryData'

const meta = {
  title: 'Components / SubjectCard / Interactive / Audio',
  component: SubjectCard
}

export default meta

export const FrogFind = {
  render: () => <InteractiveStory login={'TestUser'} subject={FROG_FIND_SUBJECT} />
}
