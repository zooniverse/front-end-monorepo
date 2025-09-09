import * as stories from './PlainButton.stories'
import { render } from '@testing-library/react'
import { composeStories } from '@storybook/react'

describe('Components > PlainButton', function () {
  const { Default } = composeStories(stories)
  const mockHref = 'www.zooniverse.org'

  it('should render text prop as a label', function () {
    const { getByText } = render(<Default />)
    const item = getByText(Default.args.text)
    expect(item).toBeTruthy()
  })

  it('should render a button element when not disabled and href is empty', function () {
    const { getByRole, queryByRole } = render(<Default href='' />)
    const button = getByRole('button')
    const link = queryByRole('link')
    expect(link).to.equal(null)
    expect(button).toBeTruthy()
  })

  it('should render an anchor element when not disabled and href is defined', function () {
    const { getByRole, queryByRole } = render(<Default href={mockHref} />)
    const link = getByRole('link')
    const button = queryByRole('button')
    expect(link).toBeTruthy()
    expect(link.href).include(mockHref)
    expect(button).to.equal(null)
  })

  it('should render a button element when disabled and href is defined', function () {
    const { getByRole, queryByRole } = render(<Default disabled href={mockHref} />)
    const button = getByRole('button')
    const link = queryByRole('link')
    expect(button).toBeTruthy()
    expect(link).to.equal(null)
  })
})
