import { render, screen } from '@testing-library/react'

import OrganizationLink from './OrganizationLink'

const SLUG = 'zooniverse/test-organization'
const TITLE = 'Test Organization'

describe('Component > Hero > OrganizationLink', function () {
  it('should render a link to the organization page', function () {
    render(<OrganizationLink slug={SLUG} title={TITLE} />)
    expect(screen.getByRole('link', { name: TITLE })).to.exist()
  })
})
