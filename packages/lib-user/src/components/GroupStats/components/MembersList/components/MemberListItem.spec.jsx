import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { GROUP_ADMIN_USER, GROUP_MEMBER_USER } from '../../../../../../test/mocks/panoptes/index.js'

import Meta, { Default, GroupAdmin } from './MemberListItem.stories'

describe('components > GroupStats > MemberListItem', function () {
  describe('with a group member', function () {
    const DefaultStory = composeStory(Default, Meta)

    it('should show the user\'s display name', function () {
      render(<DefaultStory />)
      const displayName = screen.getByText(GROUP_MEMBER_USER.display_name)
      expect(displayName).to.be.ok()
    })

    it('should show the user\'s login', function () {
      render(<DefaultStory />)
      const login = screen.getByText(`@${GROUP_MEMBER_USER.login}`)
      expect(login).to.be.ok()
    })

    it('should show a menu button', function () {
      render(<DefaultStory />)
      const menuButton = screen.getByRole('button', { name: `Menu to update or remove ${GROUP_MEMBER_USER.display_name}'s group membership` })
      expect(menuButton).to.be.ok()
    })

    describe('when the menu button is clicked', function () {
      const user = userEvent.setup()

      it('should show a "Give admin Access" option', async function () {
        render(<DefaultStory />)
        const menuButton = screen.getByRole('button', { name: `Menu to update or remove ${GROUP_MEMBER_USER.display_name}'s group membership` })

        await user.click(menuButton)

        const giveAdminAccess = screen.getByRole('menuitem', { name: 'Give admin access' })
        expect(giveAdminAccess).to.be.ok()
      })

      it('should show a "Remove member" option', async function () {
        render(<DefaultStory />)
        const menuButton = screen.getByRole('button', { name: `Menu to update or remove ${GROUP_MEMBER_USER.display_name}'s group membership` })

        await user.click(menuButton)

        const removeMember = screen.getByRole('menuitem', { name: 'Remove member' })
        expect(removeMember).to.be.ok()
      })
    })
  })

  describe('with a group admin', function () {
    const GroupAdminStory = composeStory(GroupAdmin, Meta)

    it('should an admin icon', function () {
      render(<GroupAdminStory />)
      const adminIcon = screen.getByLabelText('UserAdmin')
      expect(adminIcon).to.be.ok()
    })

    it('should show the user\'s display name', function () {
      render(<GroupAdminStory />)
      const displayName = screen.getByText(GROUP_ADMIN_USER.display_name)
      expect(displayName).to.be.ok()
    })

    it('should show the user\'s login', function () {
      render(<GroupAdminStory />)
      const login = screen.getByText(`@${GROUP_ADMIN_USER.login}`)
      expect(login).to.be.ok()
    })

    it('should show a menu button', function () {
      render(<GroupAdminStory />)
      const menuButton = screen.getByRole('button', { name: `Menu to update or remove ${GROUP_ADMIN_USER.display_name}'s group membership` })
      expect(menuButton).to.be.ok()
    })

    describe('when the menu button is clicked', function () {
      const user = userEvent.setup()

      it('should show a "Remove admin access" option', async function () {
        render(<GroupAdminStory />)
        const menuButton = screen.getByRole('button', { name: `Menu to update or remove ${GROUP_ADMIN_USER.display_name}'s group membership` })

        await user.click(menuButton)

        const removeAdminAccess = screen.getByRole('menuitem', { name: 'Remove admin access' })
        expect(removeAdminAccess).to.be.ok()
      })

      it('should show a "Remove member" option', async function () {
        render(<GroupAdminStory />)
        const menuButton = screen.getByRole('button', { name: `Menu to update or remove ${GROUP_ADMIN_USER.display_name}'s group membership` })

        await user.click(menuButton)

        const removeMember = screen.getByRole('menuitem', { name: 'Remove member' })
        expect(removeMember).to.be.ok()
      })
    })
  })
})
