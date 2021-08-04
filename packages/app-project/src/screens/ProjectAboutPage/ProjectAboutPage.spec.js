import { ProjectAboutPage } from './ProjectAboutPage'
import { render, screen } from '@testing-library/react'

describe.only('Component > ProjectAboutPage', () => {
  describe('About pages layout', () => {
    const aboutPageData = {
      title: 'Title',
      content: 'This is some content.'
    }

    it('should render the dropdown nav on mobile screen sizes', () => {
      // links should not be rendered for research and team, just drop button
    })
  })

  describe('Team page specific components', () => {
    const aboutTeamPageData = {
      title: 'team',
      content: 'This is some content.'
    }

    const teamArray = [
      { id: 0, display_name: 'name', role: 'scientist' },
      { id: 1, display_name: 'name', role: 'owner' }
    ]

    it('should render a list of Team Members', () => {
      // list of TeamMember components should be 2
    })
  })
})
