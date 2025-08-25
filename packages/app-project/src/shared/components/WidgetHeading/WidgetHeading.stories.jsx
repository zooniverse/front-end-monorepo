import WidgetHeadingComponent from './WidgetHeading'
import { WidgetHeadingMock } from './WidgetHeading.mock'

export default {
  title: 'Project App / Shared / Widget Heading',
  component: WidgetHeadingComponent
}

export const WidgetHeading = () => (
  <WidgetHeadingComponent level={WidgetHeadingMock.level}>
    {WidgetHeadingMock.children}
  </WidgetHeadingComponent>
)
