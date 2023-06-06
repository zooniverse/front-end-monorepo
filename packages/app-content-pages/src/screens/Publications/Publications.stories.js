import PublicationsContainer from './PublicationsContainer'
import mockPublicationsData from './PublicationsContainer.mock.json'

export default {
  title: 'Publications / PublicationsContainer',
  component: PublicationsContainer
}

export const Default = {
  args: {
    publicationsData: mockPublicationsData
  }
}

export const NoData = {
  args: {
    publicationsData: []
  }
}
