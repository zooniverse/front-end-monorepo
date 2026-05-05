import { composeStory } from '@storybook/react'
import { render } from '@testing-library/react'

import Meta, { Default } from './UnitSelect.stories'

const DefaultStory = composeStory(Default, Meta)

describe('Component > UnitSelect', function () {
  it('should render the unit select input', function () {
    render(<DefaultStory />)
    expect(document.getElementById('unit-select')).to.exist
  })
})
