import SubjectCard from '../../SubjectCard'
import {
  FLORIDA_KEYS_SUBJECT,
  WOODPECKER_CAVITY_CAM_SUBJECT,
  InteractiveStory
} from '../SubjectCardStoryData'

const meta = {
  title: 'Components / SubjectCard / Interactive / Video',
  component: SubjectCard
}

export default meta

export const FloridaKeys = {
  render: () => <InteractiveStory login={'TestUser'} subject={FLORIDA_KEYS_SUBJECT} />
}

export const WoodpeckerCavityCam = {
  render: () => <InteractiveStory login={'TestUser'} subject={WOODPECKER_CAVITY_CAM_SUBJECT} />
}
