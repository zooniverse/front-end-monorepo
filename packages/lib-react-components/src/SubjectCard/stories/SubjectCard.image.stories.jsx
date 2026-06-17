import SubjectCard from '../SubjectCard'
import {
  BELUGA_BITS_SUBJECT,
  DARK_ENERGY_EXPLORERS_SUBJECT,
  IGUANAS_FROM_ABOVE_SUBJECT,
  PRINT_SUBJECT,
  PENGUIN_WATCH_SUBJECT,
  RADIO_METEOR_ZOO_SUBJECT,
  StoryRow,
  WILDWATCH_KENYA_SUBJECT,
  GALAXY_ZOO_SUBJECT
} from './SubjectCardStoryData'

const meta = {
  title: 'Components / SubjectCard / Image',
  component: SubjectCard
}

export default meta

export const LoggedOutLandscape = {
  render: () => <StoryRow subject={BELUGA_BITS_SUBJECT} />
}

export const LoggedOutLandscapeBusy = {
  render: () => <StoryRow subject={WILDWATCH_KENYA_SUBJECT} />
}

export const LoggedInLandscape = {
  render: () => <StoryRow login={'TestUser'} subject={RADIO_METEOR_ZOO_SUBJECT} />
}

export const LoggedInLandscapeBusy = {
  render: () => <StoryRow login={'TestUser'} subject={PENGUIN_WATCH_SUBJECT} />
}

export const LoggedInPortrait = {
  render: () => <StoryRow login={'TestUser'} subject={PRINT_SUBJECT} />
}

export const LoggedInPortraitBusy = {
  render: () => <StoryRow login={'TestUser'} subject={DARK_ENERGY_EXPLORERS_SUBJECT} />
}

export const LoggedInSquare = {
  render: () => <StoryRow login={'TestUser'} subject={IGUANAS_FROM_ABOVE_SUBJECT} />
}

export const LoggedInSquareDark = {
  render: () => <StoryRow login={'TestUser'} subject={GALAXY_ZOO_SUBJECT} />
}
