import * as stories from './TeamMember.stories'
import { render } from '@testing-library/react'

describe('Component > TeamMember', function () {
  const { Default, Placeholder } = stories

  it('should display the user display name, username, and roles', function () {
    const { getByText } = render(<Default />)
    const item = getByText('Mock User')
    expect(item).exists()

    const username = getByText('@mock_user')
    expect(username).exists()

    const firstRole = getByText('About.TeamMember.collaborator')
    expect(firstRole).exists()
  })

  it('should display username as a NavLink to user profile', function () {
    const { getByRole } = render(<Default />)
    const link = getByRole('link')
    expect(link).exists()
    expect(link.href).include(
      '/zooniverse/snapshot-serengeti/users/mock_user'
    )
  })

  it('should display scientist role as researcher', function () {
    const { getByText } = render(<Default />)
    const secondRole = getByText('About.TeamMember.researcher')
    expect(secondRole).exists()
  })

  it('should display a placeholder avatar image if user has no avatar src', function () {
    const { getByAltText } = render(<Placeholder />)
    const placeholder = getByAltText('Placeholder Avatar')
    expect(placeholder).exists()
  })
})
