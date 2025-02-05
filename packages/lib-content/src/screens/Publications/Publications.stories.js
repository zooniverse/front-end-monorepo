import Publications from './Publications.js'
import mockPublicationsData from './publicationsData.mock.json'

const mockSections = mockPublicationsData.map(category => ({
  name: category.title,
  slug: category.title.toLowerCase().replaceAll(' ', '-')
}))

export default {
  title: 'About / Publications',
  component: Publications
}

export const Default = {
  args: {
    publicationsData: mockPublicationsData,
    sections: mockSections
  }
}

export const NoData = {
  args: {
    publicationsData: [],
    sections: []
  }
}
