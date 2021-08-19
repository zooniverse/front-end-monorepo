import * as stories from './AboutNavLink.stories'
import { render } from '@testing-library/react'

describe('Component > AboutNavLink', function () {
  const { Default } = stories

  it('should render the component', function () {
    const { getByRole } = render(<Default />)
    const link = getByRole('link')
    expect(link).exists()
  })
})
