import DropdownNav from './DropdownNav.js'
import mockPublicationsData from '../../../screens/Publications/Publications.mock.json'

const mockSections = mockPublicationsData.map(category => ({
  name: category.title,
  slug: category.title.toLowerCase().replaceAll(' ', '-')
}))


export default {
  title: 'Shared / DropdownNav',
  component: DropdownNav
}

export const Default = {
  args: {
    activeSection: mockSections[0].slug,
    sidebarLabel: 'Discipline',
    sections: mockSections
  }
}
