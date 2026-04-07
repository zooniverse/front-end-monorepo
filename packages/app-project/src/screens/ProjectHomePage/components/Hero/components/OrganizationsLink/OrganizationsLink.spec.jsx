import { render, screen } from '@testing-library/react'

import OrganizationsLink from './OrganizationsLink'

const ORGANIZATIONS = [{
  slug: 'zooniverse/test-organization',
  title: 'Test Organization'
}]

describe('Component > Hero > OrganizationsLink', function () {
  it('should render links to the organization pages', function () {
    render(<OrganizationsLink organizations={ORGANIZATIONS} />)
    expect(screen.getByRole('link', { name: ORGANIZATIONS.title })).toBeDefined()
  })
})
