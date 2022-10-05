import { render, fireEvent } from '@testing-library/react'
import * as stories from './LocaleSwitcher.stories'
import sinon from 'sinon'

describe('Component > LocaleSwitcher', function () {
  const { Default } = stories

  it('should render available locales as a dropdown', function () {
    const { getByRole, getByText, getAllByText } = render(<Default />)
    fireEvent.click(getByRole('button'))
    expect(getAllByText('English')).to.exist()
    expect(getByText('Français')).to.exist()
  })
})
