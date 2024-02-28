import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import Meta, { Default, NaN } from './TitledStat.stories.js'

describe('components > shared > TitledStat', function () {
  const DefaultStory = composeStory(Default, Meta)

  it('should show the title', function () {
    render(<DefaultStory />)

    expect(screen.getByText('Classifications')).to.be.ok()
  })

  it('should show the value', function () {
    render(<DefaultStory />)

    expect(screen.getByText('1,234')).to.be.ok()
  })
  
  describe('when the value is NaN', function () {
    const NaNStory = composeStory(NaN, Meta)

    it('should show the title', function () {
      render(<NaNStory />)

      expect(screen.getByText('Hours')).to.be.ok()
    })

    it('should show the value as 0', function () {
      render(<NaNStory />)

      expect(screen.getByText('0')).to.be.ok()
    })
  })
})
