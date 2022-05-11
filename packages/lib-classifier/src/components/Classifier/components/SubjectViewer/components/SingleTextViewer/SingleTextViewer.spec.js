import React from 'react'
import { render, screen } from '@testing-library/react'

import SingleTextViewer from './SingleTextViewer'

describe('Component > SingleTextViewer', function () {
  it('should render without crashing', function () {
    render(<SingleTextViewer />)
    expect(screen).to.be.ok()
  })

  it('should render content', function () {
    render(<SingleTextViewer content='test subject content' />)
    expect(screen.getByText('test subject content')).to.exist()
  })
})
