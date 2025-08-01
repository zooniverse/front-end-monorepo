import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import Meta, { Admin, Member } from './GroupCard.stories'
import { MemberGroupCard } from './GroupCard.mock.js'

describe('components > MyGroups > GroupCard', function () {
  const MemberStory = composeStory(Member, Meta)

  it('should show the group name', function () {
    render(<MemberStory />)

    expect(screen.getByText(MemberGroupCard.displayName)).toBeTruthy()
  })

  it('should show the classifications count', function () {
    render(<MemberStory />)

    expect(screen.getByText(MemberGroupCard.classifications.toLocaleString())).toBeTruthy()
  })

  it('should show the contributors count', function () {
    render(<MemberStory />)

    expect(screen.getByText(MemberGroupCard.contributors.toLocaleString())).toBeTruthy()
  })

  it('should show the hours count', function () {
    render(<MemberStory />)

    expect(screen.getByText(MemberGroupCard.hours.toLocaleString())).toBeTruthy()
  })

  it('should show the projects count', function () {
    render(<MemberStory />)

    expect(screen.getByText(MemberGroupCard.projects.toLocaleString())).toBeTruthy()
  })

  it('should show the member role', function () {
    render(<MemberStory />)

    expect(screen.getByText('Member')).toBeTruthy()
  })

  describe('with the admin role', function () {
    const AdminStory = composeStory(Admin, Meta)

    it('should show the admin role', function () {
      render(<AdminStory />)

      expect(screen.getByText('Admin')).toBeTruthy()
    })
  })
})
