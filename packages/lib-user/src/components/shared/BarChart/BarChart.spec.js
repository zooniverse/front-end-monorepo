import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import Meta, { Last7Days, Last30DaysHours, Last3Months, Last12MonthsHours } from './BarChart.stories.js'

describe('components > shared > BarChart', function () {
  describe('with Last7Days', function () {
    const Last7DaysStory = composeStory(Last7Days, Meta)

    it('should have the expected aria-label', function () {
      render(<Last7DaysStory />)
      
      expect(screen.getByLabelText('Bar chart of Classifications by Day from 2023-05-27 to 2023-06-02')).to.be.ok()
    })
    
    it('should show the expected number of count labels', function () {
      render(<Last7DaysStory />)
      
      expect(screen.getAllByTestId('countLabel')).to.have.lengthOf(5)
    })
    
    it('should show the expected number of period labels', function () {
      render(<Last7DaysStory />)
      
      expect(screen.getAllByTestId('periodLabel')).to.have.lengthOf(7)
    })
  })
  
  describe('with Last30Days and Hours', function () {
    const Last30DaysHoursStory = composeStory(Last30DaysHours, Meta)
    
    it('should show the expected number of time labels', function () {
      render(<Last30DaysHoursStory />)
      
      expect(screen.getAllByTestId('timeLabel')).to.have.lengthOf(5)
    })
    
    it('should show the expected number of period labels', function () {
      render(<Last30DaysHoursStory />)
      
      const periodLabels = screen.getAllByTestId('periodLabel')
      const visiblePeriodLabels = periodLabels.filter(periodLabel => {
        const className = periodLabel.className
        return !className.includes('hidden-period-label')
      })

      // every fourth day within 30 days would be 8 days
      expect(visiblePeriodLabels).to.have.lengthOf(8)
    })
  })
  
  describe('with Last3Months', function () {
    const Last3MonthsStory = composeStory(Last3Months, Meta)
    
    it('should show the expected number of count labels', function () {
      render(<Last3MonthsStory />)
      
      expect(screen.getAllByTestId('countLabel')).to.have.lengthOf(5)
    })
    
    it('should show the expected number of period labels', function () {
      render(<Last3MonthsStory />)
      
      expect(screen.getAllByTestId('periodLabel')).to.have.lengthOf(12)
    })
  })
  
  describe('with Last12Months and Hours', function () {
    const Last12MonthsHoursStory = composeStory(Last12MonthsHours, Meta)
    
    it('should show the expected number of time labels', function () {
      render(<Last12MonthsHoursStory />)
      
      expect(screen.getAllByTestId('timeLabel')).to.have.lengthOf(5)
    })
    
    it('should show the expected number of period labels', function () {
      render(<Last12MonthsHoursStory />)
      
      expect(screen.getAllByTestId('periodLabel')).to.have.lengthOf(12)
    })
  })
})
