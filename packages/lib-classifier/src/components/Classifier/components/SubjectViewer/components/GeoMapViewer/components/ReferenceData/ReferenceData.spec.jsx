import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import Meta, { Default, Empty } from './ReferenceData.stories'

const DefaultStory = composeStory(Default, Meta)

describe('Component > ReferenceData', function () {
  it('should render the Reference Data title', function () {
    render(<DefaultStory />)
    expect(screen.getByText('Reference Data')).to.exist
  })

  it('should render the reference data kays', function () {
    render(<DefaultStory />)
    expect(screen.getByText('county:')).to.exist
    expect(screen.getByText('country:')).to.exist
    expect(screen.getByText('locality:')).to.exist
    expect(screen.getByText('state:')).to.exist
  })

  it('should render the reference data values', function () {
    render(<DefaultStory />)
    expect(screen.getByText('Transylvania County')).to.exist
    expect(screen.getByText('United States of America')).to.exist
    expect(screen.getByText('Along US Rt. 276, ca. 2.5 mi. S of Jct. with Blue Ridge Parkway.')).to.exist
    expect(screen.getByText('NC')).to.exist
  })
})
