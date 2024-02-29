import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import Meta, { Member, Admin } from './GroupCard.stories.js'

describe('components > MyGroups > GroupCard', function () {
  const MemberStory = composeStory(Member, Meta)

  it('should show the group name', function () {
    render(<MemberStory />)

    expect(screen.getByText('Group Name')).to.be.ok()
  })

  it('should show the classifications count', function () {
    render(<MemberStory />)

    expect(screen.getByText('1,234')).to.be.ok()
  })

  it('should show the contributors count', function () {
    render(<MemberStory />)

    expect(screen.getByText('89')).to.be.ok()
  })

  it('should show the hours count', function () {
    render(<MemberStory />)

    expect(screen.getByText('567')).to.be.ok()
  })

  it('should show the projects count', function () {
    render(<MemberStory />)

    expect(screen.getByText('10')).to.be.ok()
  })

  it('should show the member role', function () {
    render(<MemberStory />)

    expect(screen.getByText('member')).to.be.ok()
  })

  describe('with the admin role', function () {
    const AdminStory = composeStory(Admin, Meta)

    it('should show the admin role', function () {
      render(<AdminStory />)

      expect(screen.getByText('admin')).to.be.ok()
    })
  })
})
