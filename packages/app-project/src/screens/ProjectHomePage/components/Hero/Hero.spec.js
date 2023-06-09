import { expect } from 'chai'
import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import Meta, { Default, WithOrganization } from './Hero.stories.js'

describe('Component > Hero', function () {
  let img, title, description, link
  const DefaultStory = composeStory(Default, Meta)

  before(function () {
    render(<DefaultStory />)
    img = document.querySelector("img[src='https://panoptes-uploads.zooniverse.org/production/project_background/260e68fd-d3ec-4a94-bb32-43ff91d5579a.jpeg']")
    title = screen.getByText('Nest Quest Go: Western Bluebirds')
    description = screen.getByText('Learn about and help document the wonders of nesting Western Bluebirds.')
    link = screen.getByRole('link', { name: 'Home.Hero.Introduction.link Next' })
  })

  it('should show a background `img`', function () {
    expect(img).to.be.ok()
  })

  it('should show the title', function () {
    expect(title).to.be.ok()
  })

  it('should show the description', function () {
    expect(description).to.be.ok()
  })

  it('should show a link to the about page', function () {
    expect(link).to.be.ok()
  })

  describe('with an organization', function () {
    let organizationLink
    const WithOrganizationStory = composeStory(WithOrganization, Meta)

    it('should show a link to the organization', function () {
      render(<WithOrganizationStory />)
      organizationLink = screen.getByRole('link', { name: 'Nest Quest Go' })
      expect(organizationLink).to.be.ok()
    })    
  })
})
