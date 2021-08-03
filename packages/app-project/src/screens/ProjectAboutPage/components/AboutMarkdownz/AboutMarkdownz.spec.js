import AboutMarkdownz from './AboutMarkdownz'
import { render } from '@testing-library/react'

describe('Component > AboutMarkdownz', function () {
  it('should render the component', function() {
    const { container } = render(<AboutMarkdownz />)
    expect(container).exists()
  })
})
