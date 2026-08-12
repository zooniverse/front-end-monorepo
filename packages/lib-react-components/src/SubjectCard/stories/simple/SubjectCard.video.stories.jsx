import SubjectCard from '../../SubjectCard'
import {
  FLORIDA_KEYS_SUBJECT,
  WOODPECKER_CAVITY_CAM_SUBJECT,
  StoryRow
} from '../SubjectCardStoryData'

const meta = {
  title: 'Components / SubjectCard / Simple / Video',
  component: SubjectCard
}

export default meta

export const FloridaKeys = {
  render: () => <StoryRow login={'TestUser'} subject={FLORIDA_KEYS_SUBJECT} />
}

export const WoodpeckerCavityCam = {
  render: () => <StoryRow login={'TestUser'} subject={WOODPECKER_CAVITY_CAM_SUBJECT} />
}
