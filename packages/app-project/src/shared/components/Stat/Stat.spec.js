import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import { format } from 'd3'
import Meta, { Default, HugeNumber, Zero } from './Stat.stories.js'
import Mocks from './Stat.mock'


describe('Component > Stat', function () {
  [Default, HugeNumber, Zero].forEach(function (Story) {
    describe(`${Story.name} Stat`, function () {
      let mock = Mocks[`${Story.name}Mock`]

      beforeEach(function () {
        const ComposedStory = composeStory(Story, Meta)
        render(<ComposedStory />)
      })

      it('should render the Animated Number', function () {
        expect(screen.getByText(format(',d')(mock.value))).to.exist()
      })
    
      it('should render the Text Label', function () {
        expect(screen.getByText(mock.label)).to.exist()
      })
    })
  })
})
