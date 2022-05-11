import React from 'react'
import * as stories from './PrimaryButton.stories'
import { render } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'

describe.only('Component > PrimaryButton', function () {
  const { Default } = composeStories(stories)
  const mockHref = 'www.zooniverse.org'

  it('should render the label', function () {
    const { getByText } = render(<Default />)
    const item = getByText(Default.args.label)
    expect(item).exists()
  })

  it('should render a button element when not disabled and href is empty', function () {
    const { getByRole, queryByRole } = render(<Default href='' />)
    const button = getByRole('button')
    const link = queryByRole('link')
    expect(link).to.be.null()
    expect(button).exists()
  })

  it('should render an anchor element when not disabled and href is defined', function () {
    const { getByRole, queryByRole } = render(<Default href={mockHref} />)
    const link = getByRole('link')
    const button = queryByRole('button')
    expect(link).exists()
    expect(link.href).include(mockHref)
    expect(button).to.be.null()
  })

  it('should render a button element when disabled and href is defined', function () {
    const { getByRole, queryByRole } = render(<Default disabled href={mockHref} />)
    const button = getByRole('button')
    const link = queryByRole('link')
    expect(button).exists()
    expect(link).to.be.null()
  })
})
