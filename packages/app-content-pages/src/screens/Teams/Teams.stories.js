import Teams from './Teams.js'
import mockData from './Teams.mock.json'

const mockSections = mockData.map(team => ({
  name: team.name,
  slug: team.name.toLowerCase().replaceAll(' ', '-')
}))

export default {
  title: 'Our Team / Teams Page',
  component: Teams
}

export const Default = {
  args: {
    sections: mockSections,
    teamData: mockData
  }
}

export const NoData = {
  args: {
    sections: [],
    teamData: []
  }
}
