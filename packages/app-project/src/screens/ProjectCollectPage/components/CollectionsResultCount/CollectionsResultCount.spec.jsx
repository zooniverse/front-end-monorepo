import { render, screen } from '@testing-library/react'

import CollectionsResultCount from './CollectionsResultCount'

describe('Component > CollectionsResultCount', function () {
  it('should show the result range for the current page', function () {
    render(<CollectionsResultCount count={25} page={2} pageSize={10} />)

    expect(screen.getByText('Showing 11-20 of 25 collections')).to.exist
  })

  it('should show an empty result range when there are no collections', function () {
    render(<CollectionsResultCount count={0} />)

    expect(screen.getByText('Showing 0-0 of 0 collections')).to.exist
  })
})
