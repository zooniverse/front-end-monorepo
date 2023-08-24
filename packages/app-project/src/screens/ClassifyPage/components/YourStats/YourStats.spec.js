import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import Meta, { YourStats } from './YourStats.stories.js'
import { YourStatsStoreMock } from './YourStats.mock'

describe('Component > YourStats', function () {
  let rendered;

  beforeEach(function () {
    const YourStatsStory = composeStory(YourStats, Meta)
    rendered = render(<YourStatsStory />)
  })

  it('should have a heading', function () {
    expect(screen.getByText('Classify.YourStats.title')).to.be.ok()
  })

  it('should have today\'s classification count ', async function () {
    expect(document.getElementsByClassName('test-classify-your-stats-today-count').length).to.equal(1)
  })

  it('should have this week\'s classification total ', function () {
    expect(document.getElementsByClassName('test-classify-your-stats-total-count').length).to.equal(1)
  })

  it('should have a chart heading', function () {
    expect(screen.getByText('Classify.YourStats.DailyClassificationsChart.title')).to.be.ok()
  })

  it('should have 7 bars and each bar should be an image', function () {
    expect(screen.getAllByRole('img').length).to.equal(7)
  })

  describe('Daily bars', function () {
    YourStatsStoreMock.user.personalization.stats.thisWeek.forEach(function (count, i) {
      it(`should have an accessible description for ${count.longLabel}`, function () {
        expect(screen.findByLabelText(count.alt)).to.be.ok()
      })
    })
  })
})
