import * as stories from './PlainButton.stories'
import { render } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import React from 'react'

describe('Components > PlainButton', function () {
  const { Default } = composeStories(stories)
  const mockHref = 'www.zooniverse.org'

  it('should render text prop as a label', function () {
    const { getByText } = render(<Default />)
    const item = getByText(Default.args.text)
    expect(item).exists()
  })

  it('should render a button element when not disabled and href is empty', function () {
    const { getByRole } = render(<Default href='' />)
    const button = getByRole('button')
    expect(button).exists()
  })

  it('should render an anchor element when not disabled and href is defined', function () {
    const { getByRole } = render(<Default href={mockHref} />)
    const link = getByRole('link')
    expect(link).exists()
    expect(link.href).include(mockHref)
  })

  it('should render a button element when disabled and href is defined', function () {
    const { getByRole } = render(<Default disabled href={mockHref} />)
    const button = getByRole('button')
    expect(button).exists()
  })
})
