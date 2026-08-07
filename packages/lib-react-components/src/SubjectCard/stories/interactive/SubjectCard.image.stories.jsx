import SubjectCard from '../../SubjectCard'
import {
  BELUGA_BITS_SUBJECT,
  DARK_ENERGY_EXPLORERS_SUBJECT,
  IGUANAS_FROM_ABOVE_SUBJECT,
  PRINT_SUBJECT,
  PENGUIN_WATCH_SUBJECT,
  RADIO_METEOR_ZOO_SUBJECT,
  InteractiveStory,
  WILDWATCH_KENYA_SUBJECT,
  GALAXY_ZOO_SUBJECT
} from '../SubjectCardStoryData'

const meta = {
  title: 'Components / SubjectCard / Interactive / Image',
  component: SubjectCard
}

export default meta

export const LoggedOutLandscape = {
  render: () => <InteractiveStory subject={BELUGA_BITS_SUBJECT} />
}

export const LoggedOutLandscapeBusy = {
  render: () => <InteractiveStory subject={WILDWATCH_KENYA_SUBJECT} />
}

export const LoggedInLandscape = {
  render: () => <InteractiveStory login={'TestUser'} subject={RADIO_METEOR_ZOO_SUBJECT} />
}

export const LoggedInLandscapeBusy = {
  render: () => <InteractiveStory login={'TestUser'} subject={PENGUIN_WATCH_SUBJECT} />
}

export const LoggedInPortrait = {
  render: () => <InteractiveStory login={'TestUser'} subject={PRINT_SUBJECT} />
}

export const LoggedInPortraitBusy = {
  render: () => <InteractiveStory login={'TestUser'} subject={DARK_ENERGY_EXPLORERS_SUBJECT} />
}

export const LoggedInSquare = {
  render: () => <InteractiveStory login={'TestUser'} subject={IGUANAS_FROM_ABOVE_SUBJECT} />
}

export const LoggedInSquareDark = {
  render: () => <InteractiveStory login={'TestUser'} subject={GALAXY_ZOO_SUBJECT} />
}
