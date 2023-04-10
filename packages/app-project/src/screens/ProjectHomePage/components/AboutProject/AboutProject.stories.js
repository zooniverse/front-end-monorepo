import AboutProject from './AboutProject'

const description = 'This is some descriptive text'
const projectName = 'Test Project'

export default {
  title: 'Project App / Screens / Project Home / About Project',
  component: AboutProject
}

export const Default = () => (
  <AboutProject description={description} projectName={projectName} />
)
