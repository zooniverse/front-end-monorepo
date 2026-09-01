import SubjectCard from '../../SubjectCard'
import {
  BLACK_HOLE_HUNTERS_SUBJECT,
  MIND_MAPPER_SUBJECT,
  NOTES_FROM_NATURE_GEOJSON_SUBJECT,
  StoryRow
} from '../SubjectCardStoryData'

const meta = {
  title: 'Components / SubjectCard / Simple / Application',
  component: SubjectCard
}

export default meta

export const BlackHoleHunters = {
  render: () => <StoryRow login={'TestUser'} subject={BLACK_HOLE_HUNTERS_SUBJECT} />
}

export const MindMapper = {
  render: () => <StoryRow login={'TestUser'} subject={MIND_MAPPER_SUBJECT} />
}

export const NotesFromNatureGeoJSON = {
  render: () => <StoryRow login={'TestUser'} subject={NOTES_FROM_NATURE_GEOJSON_SUBJECT} />
}
