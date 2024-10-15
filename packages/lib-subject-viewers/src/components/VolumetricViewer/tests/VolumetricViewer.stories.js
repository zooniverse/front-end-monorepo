import VolumetricViewer from './../VolumetricViewer'
import subjectData from './../data/4x4x4.json'

export default {
  title: 'Components / VolumetricViewer',
  component: VolumetricViewer
}

export const Default = () => {
  return <VolumetricViewer subjectData={subjectData} />
}
