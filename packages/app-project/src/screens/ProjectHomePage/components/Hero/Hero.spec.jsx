import { expect } from 'chai'
import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import Meta, { Default, WithOrganization } from './Hero.stories'

describe('Component > Hero', function () {
  const DefaultStory = composeStory(Default, Meta)

  beforeEach(function () {
    render(<DefaultStory />)
  })

  it('should show a background `img`', function () {
    const img = document.querySelector("img[src='https://panoptes-uploads.zooniverse.org/production/project_background/260e68fd-d3ec-4a94-bb32-43ff91d5579a.jpeg']")
    expect(img).to.be.ok()
  })

  it('should show the title', function () {
    const title = screen.getByText('Nest Quest Go: Western Bluebirds')
    expect(title).to.be.ok()
  })

  it('should show the description', function () {
    const description = screen.getByText('Learn about and help document the wonders of nesting Western Bluebirds.')
    expect(description).to.be.ok()
  })

  it('should show a link to the about page', function () {
    const link = screen.getByText('Home.Hero.Introduction.link')
    expect(link).to.be.ok()
  })

  describe('with an organization', function () {
    const WithOrganizationStory = composeStory(WithOrganization, Meta)

    it('should show a link to the organization', function () {
      render(<WithOrganizationStory />)
      const organizationLink = screen.getByRole('link', { name: 'Nest Quest Go' })
      expect(organizationLink).to.be.ok()
    })
  })
})
