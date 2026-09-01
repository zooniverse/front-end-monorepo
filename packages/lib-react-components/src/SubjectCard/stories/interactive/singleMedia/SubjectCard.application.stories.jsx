import SubjectCard from '../../../SubjectCard'
import {
  BLACK_HOLE_HUNTERS_SUBJECT,
  DATA_IMAGES_SUBJECT,
  MIND_MAPPER_SUBJECT,
  NOTES_FROM_NATURE_GEOJSON_SUBJECT,
  PLANET_HUNTERS_TESS_SUBJECT,
  InteractiveStory
} from '../../SubjectCardStoryData'

const singleDataLightCurveSubject = {
  ...PLANET_HUNTERS_TESS_SUBJECT,
  locations: PLANET_HUNTERS_TESS_SUBJECT.locations.filter(location => location['application/json'])
} 

const singleDataSubject = {
  ...DATA_IMAGES_SUBJECT,
  locations: DATA_IMAGES_SUBJECT.locations.filter(location => location['application/json'])
}

const meta = {
  title: 'Components / SubjectCard / Interactive / SingleMedia / Application',
  component: SubjectCard
}

export default meta

export const BlackHoleHunters = {
  render: () => <InteractiveStory login={'TestUser'} subject={BLACK_HOLE_HUNTERS_SUBJECT} />
}

export const PlanetHuntersTESS = {
  render: () => <InteractiveStory login={'TestUser'} subject={singleDataLightCurveSubject} />
}

export const DataLegendSubject = {
  render: () => <InteractiveStory login={'TestUser'} subject={singleDataSubject} />
}

export const MindMapper = {
  render: () => <InteractiveStory login={'TestUser'} subject={MIND_MAPPER_SUBJECT} />
}

export const NotesFromNatureGeoJSON = {
  render: () => <InteractiveStory login={'TestUser'} subject={NOTES_FROM_NATURE_GEOJSON_SUBJECT} />
}
