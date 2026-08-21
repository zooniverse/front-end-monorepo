import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import Meta, { Plain } from './RecentSubjects.stories'
import RecentSubjects from './RecentSubjects'

describe('Component > RecentSubjects', function () {
  it('should render without crashing', function () {
    render(<RecentSubjects slug='test/project' />)
    expect(screen).toBeTruthy()
  })

  it('should render with subject cards when recents are provided', function () {
    const PlainStory = composeStory(Plain, Meta)
    const { container } = render(<PlainStory />)
    expect(container).toBeTruthy()
  })
})
