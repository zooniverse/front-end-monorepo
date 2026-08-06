import SubjectCard from '../../../SubjectCard'
import {
  InteractiveStory,
  CHIMP_AND_SEE_VIDEO_IMAGES_SUBJECT,
  NFN_IMAGE_TEXT_SUBJECT,
  SMITHSONIAN_WILDLIFE_MULTI_IMAGE_SUBJECT,
  SQUIRREL_MAPPER_MULTI_IMAGE_SUBJECT
} from '../../SubjectCardStoryData'

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

export const LoggedInMultiImageExternal = {
  render: () => <InteractiveStory login={'TestUser'} subject={SQUIRREL_MAPPER_MULTI_IMAGE_SUBJECT} />
}

export const LoggedInMultiVideoImages = {
  render: () => <InteractiveStory login={'TestUser'} subject={CHIMP_AND_SEE_VIDEO_IMAGES_SUBJECT} />
}

export const LoggedInMultiImageText = {
  render: () => <InteractiveStory login={'TestUser'} subject={NFN_IMAGE_TEXT_SUBJECT} />
}
