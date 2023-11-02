import Sidebar from './Sidebar.js'
import mockPublicationsData from '../../../screens/Publications/Publications.mock.json'

const mockSections = mockPublicationsData.map(category => ({
  name: category.title,
  slug: category.title.toLowerCase().replaceAll(' ', '-')
}))


export default {
  title: 'Shared / Sidebar',
  component: Sidebar
}

export const Default = {
  args: {
    activeSection: mockSections[0].slug,
    ariaLabel: 'Publications',
    sections: mockSections
  }
}
