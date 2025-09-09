import { Provider } from 'mobx-react'
import AboutProjectComponent from './AboutProjectContainer'
import { AboutProjectMock } from './AboutProject.mock'

export default {
  title: 'Project App / Screens / Project Home / About Project',
  component: AboutProjectComponent
}

export const AboutProject = () => (
  <Provider store={AboutProjectMock}>
    <AboutProjectComponent />
  </Provider>
)
