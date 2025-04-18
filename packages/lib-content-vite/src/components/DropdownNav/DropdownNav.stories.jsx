import DropdownNav from './DropdownNav.jsx'
import mockPublicationsData from '../../../test/mocks/Publications.mock.json'

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
    activeSection: 0,
    sidebarLabel: 'Discipline',
    sections: mockSections
  }
}
