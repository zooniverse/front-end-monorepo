import SubjectCard from '../../../SubjectCard'
import {
  BELUGA_BITS_SUBJECT,
  DARK_ENERGY_EXPLORERS_SUBJECT,
  GALAXY_ZOO_SUBJECT,
  IGUANAS_FROM_ABOVE_SUBJECT,
  InteractiveStory,
  PENGUIN_WATCH_SUBJECT,
  PRINT_SUBJECT,
  RADIO_METEOR_ZOO_SUBJECT,
  SQUIRREL_MAPPER_FAILED_SUBJECT,
  SQUIRREL_MAPPER_SUBJECT,
  WILDWATCH_KENYA_SUBJECT,
} from '../../SubjectCardStoryData'

const meta = {
  title: 'Components / SubjectCard / Interactive / SingleMedia / Image',
  component: SubjectCard
}

export default meta

export const LoggedOutLandscape = {
  render: () => <InteractiveStory subject={BELUGA_BITS_SUBJECT} />
}

export const LoggedOutLandscapeBusy = {
  render: () => <InteractiveStory subject={WILDWATCH_KENYA_SUBJECT} />
}

export const Landscape = {
  render: () => <InteractiveStory login={'TestUser'} subject={RADIO_METEOR_ZOO_SUBJECT} />
}

export const LandscapeBusy = {
  render: () => <InteractiveStory login={'TestUser'} subject={PENGUIN_WATCH_SUBJECT} />
}

export const Portrait = {
  render: () => <InteractiveStory login={'TestUser'} subject={PRINT_SUBJECT} />
}

export const PortraitBusy = {
  render: () => <InteractiveStory login={'TestUser'} subject={DARK_ENERGY_EXPLORERS_SUBJECT} />
}

export const Square = {
  render: () => <InteractiveStory login={'TestUser'} subject={IGUANAS_FROM_ABOVE_SUBJECT} />
}

export const SquareDark = {
  render: () => <InteractiveStory login={'TestUser'} subject={GALAXY_ZOO_SUBJECT} />
}

export const External = {
  render: () => <InteractiveStory login={'TestUser'} subject={SQUIRREL_MAPPER_SUBJECT} />
}

export const ExternalFailed = {
  render: () => <InteractiveStory login={'TestUser'} subject={SQUIRREL_MAPPER_FAILED_SUBJECT} />
}

export const LandscapeWithCover = {
  render: () => <InteractiveStory isCover={true} login={'TestUser'} subject={RADIO_METEOR_ZOO_SUBJECT} />
}

export const PortraitWithCover = {
  render: () => <InteractiveStory isCover={true} login={'TestUser'} subject={PRINT_SUBJECT} />
}

export const LandscapeWithOnSetCover = {
  render: ({ onSetCover = () => true } = {}) => <InteractiveStory onSetCover={onSetCover} login={'TestUser'} subject={RADIO_METEOR_ZOO_SUBJECT} />
}

export const PortraitWithOnSetCover = {
  render: () => <InteractiveStory onSetCover={() => true} login={'TestUser'} subject={PRINT_SUBJECT} />
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

export const SelectModeWithOnSetCover = {
  render: ({ onSelect = () => true, onSetCover = () => true } = {}) => <InteractiveStory onSelect={onSelect} onSetCover={onSetCover} selectable={true} login={'TestUser'} subject={RADIO_METEOR_ZOO_SUBJECT} />
}
