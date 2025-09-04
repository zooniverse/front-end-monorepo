import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import Meta, { LoggedOut, LoggedIn, NotAnImage, WithoutInvert } from './MetaTools.stories'

describe('MetaTools', function () {
  it('should show a favorite icon button', function () {
    const MetaToolsStory = composeStory(LoggedOut, Meta)
    render(<MetaToolsStory />)
    const button = screen.getByRole('checkbox', { name: 'Add to favorites' })
    expect(button).toBeDefined()
  })

  it('should show a collect icon button', function () {
    const MetaToolsStory = composeStory(LoggedOut, Meta)
    render(<MetaToolsStory />)
    const button = screen.getByRole('button', { name: 'Add to collection' })
    expect(button).toBeDefined()
  })

  it('should show a share icon button', function () {
    const MetaToolsStory = composeStory(LoggedOut, Meta)
    render(<MetaToolsStory />)
    const button = screen.getByRole('button', { name: 'Share' })
    expect(button).toBeDefined()
  })

  describe('when logged out', function () {
    it('should disable the favorite icon button', function () {
      const MetaToolsStory = composeStory(LoggedOut, Meta)
      render(<MetaToolsStory />)
      const button = screen.getByRole('checkbox', { name: 'Add to favorites' })
      expect(button.disabled).to.equal(true)
    })

    it('should disable the collect icon button', function () {
      const MetaToolsStory = composeStory(LoggedOut, Meta)
      render(<MetaToolsStory />)
      const button = screen.getByRole('button', { name: 'Add to collection' })
      expect(button.disabled).to.equal(true)
    })
  })

  describe('when logged in', function () {
    it('should enable the favorite icon button', function () {
      const MetaToolsStory = composeStory(LoggedIn, Meta)
      render(<MetaToolsStory />)
      const button = screen.getByRole('checkbox', { name: 'Add to favorites' })
      expect(button.disabled).to.equal(false)
    })

    it('should enable the collect icon button', function () {
      const MetaToolsStory = composeStory(LoggedIn, Meta)
      render(<MetaToolsStory />)
      const button = screen.getByRole('button', { name: 'Add to collection' })
      expect(button.disabled).to.equal(false)
    })
  })

  describe('when the location is an image', function () {
    it('should show an image icon button', function () {
      const MetaToolsStory = composeStory(LoggedIn, Meta)
      render(<MetaToolsStory />)
      const button = screen.getByRole('link', { name: 'Subject image' })
      expect(button).toBeDefined()
    })
  })

  describe('when the location is not an image', function () {
    it('should not show an image icon button', function () {
      const MetaToolsStory = composeStory(NotAnImage, Meta)
      render(<MetaToolsStory />)
      const button = screen.queryByRole('link', { name: 'Subject image' })
      expect(button).toBeNull()
    })
  })
  
  describe('when onInvert is provided', function () {
    it('should show an invert icon button', function () {
      const MetaToolsStory = composeStory(LoggedIn, Meta)
      render(<MetaToolsStory />)
      const button = screen.getByRole('checkbox', { name: 'Invert subject color' })
      expect(button).toBeDefined()
    })
  })

  describe('when onInvert is not provided', function () {
    it('should not show an invert icon button', function () {
      const MetaToolsStory = composeStory(WithoutInvert, Meta)
      render(<MetaToolsStory />)
      const button = screen.queryByRole('checkbox', { name: 'Invert subject color' })
      expect(button).toBeNull()
    })
  })
})
