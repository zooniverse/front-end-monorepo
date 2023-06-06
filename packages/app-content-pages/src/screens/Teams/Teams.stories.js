import TeamsContainer from './TeamsContainer.js'
import mockData from './TeamsContainer.mock.json'

export default {
  title: 'Our Team / TeamsContainer',
  component: TeamsContainer
}

export const Default = {
  args: {
    teamData: mockData
  }
}

export const NoData = {
  args: {
    teamData: []
  }
}
