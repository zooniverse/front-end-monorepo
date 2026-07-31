import SubjectCard from '../../SubjectCard'
import {
  InteractiveStory,
  SMITHSONIAN_WILDLIFE_MULTI_IMAGE_SUBJECT
} from '../SubjectCardStoryData'

const meta = {
  title: 'Components / SubjectCard / Interactive / MultiMedia',
  component: SubjectCard
}

export default meta

export const LoggedOutMultiImage = {
  render: () => <InteractiveStory subject={SMITHSONIAN_WILDLIFE_MULTI_IMAGE_SUBJECT} />
}

export const LoggedInMultiImage = {
  render: () => <InteractiveStory login={'TestUser'} subject={SMITHSONIAN_WILDLIFE_MULTI_IMAGE_SUBJECT} />
}
