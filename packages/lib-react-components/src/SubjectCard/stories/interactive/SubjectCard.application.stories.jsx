import SubjectCard from '../../SubjectCard'
import {
  BLACK_HOLE_HUNTERS_SUBJECT,
  MIND_MAPPER_SUBJECT,
  NOTES_FROM_NATURE_GEOJSON_SUBJECT,
  InteractiveStory
} from '../SubjectCardStoryData'

const meta = {
  title: 'Components / SubjectCard / Interactive / Application',
  component: SubjectCard
}

export default meta

export const BlackHoleHunters = {
  render: () => <InteractiveStory login={'TestUser'} subject={BLACK_HOLE_HUNTERS_SUBJECT} />
}

export const MindMapper = {
  render: () => <InteractiveStory login={'TestUser'} subject={MIND_MAPPER_SUBJECT} />
}

export const NotesFromNatureGeoJSON = {
  render: () => <InteractiveStory login={'TestUser'} subject={NOTES_FROM_NATURE_GEOJSON_SUBJECT} />
}
