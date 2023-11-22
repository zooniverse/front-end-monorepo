import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import Meta, { Default, Group, GroupWithHours, UserWithHours } from './ProfileHeader.stories.js'

describe('components > UserStats > ProfileHeader', function () {
  describe('with a user', function () {
    it('should show the user\'s avatar', function () {
      const DefaultStory = composeStory(Default, Meta)
      render(<DefaultStory />)
      const avatar = screen.getByAltText('TestUser avatar')
      expect(avatar).to.be.ok()
    })

    it('should show the user\'s display name', function () {
      const DefaultStory = composeStory(Default, Meta)
      render(<DefaultStory />)
      const displayName = screen.getByText('Test User')
      expect(displayName).to.be.ok()
    })

    it('should show the user\'s login', function () {
      const DefaultStory = composeStory(Default, Meta)
      render(<DefaultStory />)
      const login = screen.getByText('@TestUser')
      expect(login).to.be.ok()
    })

    it('should show the user\'s classifications', function () {
      const DefaultStory = composeStory(Default, Meta)
      render(<DefaultStory />)
      const classifications = screen.getByText('384')
      expect(classifications).to.be.ok()
    })

    it('should show the user\'s projects', function () {
      const DefaultStory = composeStory(Default, Meta)
      render(<DefaultStory />)
      const projects = screen.getByText('22')
      expect(projects).to.be.ok()
    })

    it('should show the user\'s hours', function () {
      const UserWithHoursStory = composeStory(UserWithHours, Meta)
      render(<UserWithHoursStory />)
      const hours = screen.getByText('5')
      expect(hours).to.be.ok()
    })
  })

  describe('with a group', function () {
    it('should show the group\'s display name', function () {
      const GroupStory = composeStory(Group, Meta)
      render(<GroupStory />)
      const displayName = screen.getByText('Test Group')
      expect(displayName).to.be.ok()
    })

    it('should show the group\'s classifications', function () {
      const GroupStory = composeStory(Group, Meta)
      render(<GroupStory />)
      const classifications = screen.getByText('1526')
      expect(classifications).to.be.ok()
    })

    it('should show the group\'s contributors', function () {
      const GroupStory = composeStory(Group, Meta)
      render(<GroupStory />)
      const contributors = screen.getByText('386')
      expect(contributors).to.be.ok()
    })

    it('should show the group\'s projects', function () {
      const GroupStory = composeStory(Group, Meta)
      render(<GroupStory />)
      const projects = screen.getByText('31')
      expect(projects).to.be.ok()
    })

    it('should show the group\'s hours', function () {
      const GroupWithHoursStory = composeStory(GroupWithHours, Meta)
      render(<GroupWithHoursStory />)
      const hours = screen.getByText('12')
      expect(hours).to.be.ok()
    })
  })
})
