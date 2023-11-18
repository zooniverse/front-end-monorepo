import { composeStory } from '@storybook/react'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import Meta, { Default, Group, GroupWithHours, UserWithHours } from './ProfileHeader.stories.jsx'

describe('components > UserStats > ProfileHeader', function () {
  describe('with a user', function () {
    afterEach(function () {
      cleanup()
    })

    it('should show the user\'s avatar', function () {
      const DefaultStory = composeStory(Default, Meta)
      render(<DefaultStory />)
      const avatar = screen.getByAltText('TestUser avatar')
      expect(avatar).toBeDefined()
    })

    it('should show the user\'s display name', function () {
      const DefaultStory = composeStory(Default, Meta)
      render(<DefaultStory />)
      const displayName = screen.getByText('Test User')
      expect(displayName).toBeDefined()
    })

    it('should show the user\'s login', function () {
      const DefaultStory = composeStory(Default, Meta)
      render(<DefaultStory />)
      const login = screen.getByText('@TestUser')
      expect(login).toBeDefined()
    })

    it('should show the user\'s classifications', function () {
      const DefaultStory = composeStory(Default, Meta)
      render(<DefaultStory />)
      const classifications = screen.getByText('384')
      expect(classifications).toBeDefined()
    })

    it('should show the user\'s projects', function () {
      const DefaultStory = composeStory(Default, Meta)
      render(<DefaultStory />)
      const projects = screen.getByText('22')
      expect(projects).toBeDefined()
    })

    it('should show the user\'s hours', function () {
      const UserWithHoursStory = composeStory(UserWithHours, Meta)
      render(<UserWithHoursStory />)
      const hours = screen.getByText('5')
      expect(hours).toBeDefined()
    })
  })

  describe('with a group', function () {
    afterEach(function () {
      cleanup()
    })

    it('should show the group\'s display name', function () {
      const GroupStory = composeStory(Group, Meta)
      render(<GroupStory />)
      const displayName = screen.getByText('Test Group')
      expect(displayName).toBeDefined()
    })

    it('should show the group\'s classifications', function () {
      const GroupStory = composeStory(Group, Meta)
      render(<GroupStory />)
      const classifications = screen.getByText('1526')
      expect(classifications).toBeDefined()
    })

    it('should show the group\'s contributors', function () {
      const GroupStory = composeStory(Group, Meta)
      render(<GroupStory />)
      const contributors = screen.getByText('386')
      expect(contributors).toBeDefined()
    })

    it('should show the group\'s projects', function () {
      const GroupStory = composeStory(Group, Meta)
      render(<GroupStory />)
      const projects = screen.getByText('31')
      expect(projects).toBeDefined()
    })

    it('should show the group\'s hours', function () {
      const GroupWithHoursStory = composeStory(GroupWithHours, Meta)
      render(<GroupWithHoursStory />)
      const hours = screen.getByText('12')
      expect(hours).toBeDefined()
    })
  })
})
