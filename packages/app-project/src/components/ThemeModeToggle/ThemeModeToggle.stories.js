import ThemeModeToggleComponent from './index'
import { Provider } from 'mobx-react'
import { ThemeModeToggleMock } from './ThemeModeToggle.mock'

export default {
  title: 'Project App / Shared / ThemeModeToggle',
  component: ThemeModeToggleComponent,
}

export const ThemeModeToggle = () => (
  <Provider store={ThemeModeToggleMock}>
    <ThemeModeToggleComponent />
  </Provider>
)
