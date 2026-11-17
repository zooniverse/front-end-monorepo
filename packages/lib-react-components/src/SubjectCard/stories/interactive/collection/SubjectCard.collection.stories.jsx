import SubjectCard from '../../../SubjectCard'
import {
  InteractiveStory,
  PRINT_SUBJECT,
  RADIO_METEOR_ZOO_SUBJECT
} from '../../SubjectCardStoryData'

const meta = {
  title: 'Components / SubjectCard / Interactive / Collection States',
  component: SubjectCard
}

export default meta

export const LandscapeWithCover = {
  render: ({
    onRemoveFromCollection = () => true,
    onSetCover = () => true
  } = {}) => <InteractiveStory onRemoveFromCollection={onRemoveFromCollection} onSetCover={onSetCover} login={'TestUser'} isCover={true} subject={RADIO_METEOR_ZOO_SUBJECT} />
}

export const PortraitWithCover = {
  render: ({
    onRemoveFromCollection = () => true,
    onSetCover = () => true
  } = {}) => <InteractiveStory onRemoveFromCollection={onRemoveFromCollection} onSetCover={onSetCover} login={'TestUser'} isCover={true} subject={PRINT_SUBJECT} />
}

export const Landscape = {
  render: ({
    onRemoveFromCollection = () => true,
    onSetCover = () => true
  } = {}) => <InteractiveStory onRemoveFromCollection={onRemoveFromCollection} onSetCover={onSetCover} login={'TestUser'} subject={RADIO_METEOR_ZOO_SUBJECT} />
}

export const Portrait = {
  render: ({
    onRemoveFromCollection = () => true,
    onSetCover = () => true
  } = {}) => <InteractiveStory onRemoveFromCollection={onRemoveFromCollection} onSetCover={onSetCover} login={'TestUser'} subject={PRINT_SUBJECT} />
}

export const SelectMode = {
  render: ({ onSelect = () => true } = {}) => <InteractiveStory onSelect={onSelect} selectable={true} login={'TestUser'} subject={RADIO_METEOR_ZOO_SUBJECT} />
}

export const SelectModeSelected = {
  render: ({ onSelect = () => true } = {}) => <InteractiveStory onSelect={onSelect} selectable={true} selected={true} login={'TestUser'} subject={RADIO_METEOR_ZOO_SUBJECT} />
}

export const SelectModeWithCover = {
  render: ({ onSelect = () => true } = {}) => <InteractiveStory isCover={true} onSelect={onSelect} selectable={true} login={'TestUser'} subject={RADIO_METEOR_ZOO_SUBJECT} />
}

export const SelectModeWithCoverSelected = {
  render: ({ onSelect = () => true } = {}) => <InteractiveStory isCover={true} onSelect={onSelect} selectable={true} selected={true} login={'TestUser'} subject={RADIO_METEOR_ZOO_SUBJECT} />
}
