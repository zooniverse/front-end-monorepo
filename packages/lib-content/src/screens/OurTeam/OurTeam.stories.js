import OurTeam from './OurTeam.js'
import mockData from './teamData.mock.json'

const mockSections = mockData.map(team => ({
  name: team.name,
  slug: team.name.toLowerCase().replaceAll(' ', '-')
}))

export default {
  title: 'About / Our Team',
  component: OurTeam
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
