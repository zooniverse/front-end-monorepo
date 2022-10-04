import React from 'react'
import { render, screen } from '@testing-library/react'

import ZooFooter from './ZooFooter'


describe('<ZooFooter />', function () {
  this.timeout(5000)
  let homeLink, tagLine, linkLists, socialLinks, policyNavigation

  const LINK_LISTS = [
    'About',
    'Build a Project',
    'Get Involved',
    'News',
    'Projects',
    'Talk'
  ]

  const SOCIAL_LINKS = [
    'facebook',
    'twitter',
    'instagram'
  ]

  before(function () {
    render(<ZooFooter />)
    homeLink = screen.getByRole('link', { name: 'Zooniverse' })
    tagLine = screen.getByText('People-Powered Research')
    linkLists = LINK_LISTS.map(listTitle => screen.getByRole('list', { name: listTitle})).filter(Boolean)
    socialLinks = SOCIAL_LINKS.map(linkTitle => screen.getByRole('link', { name: linkTitle})).filter(Boolean)
    policyNavigation = screen.getByRole('navigation', { name: 'Zooniverse Policies'})
  })

  it('should link to the home page', function () {
    expect(homeLink.href).to.equal('https://www.zooniverse.org/')
  })

  it('should show the Zooniverse tag line', function () {
    expect(tagLine).to.exist()
  })

  it('should containe lists of Zooniverse links', function () {
    expect(linkLists).to.have.lengthOf(LINK_LISTS.length)
  })

  it('should contain links to Zooniverse social media', function () {
    expect(socialLinks).to.have.lengthOf(SOCIAL_LINKS.length)
  })

  it('should contain links to Zooniverse Policies', function () {
    expect(policyNavigation).to.exist()
  })
})
